// Updated by king abhishek hingnikar
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import source from 'vinyl-source-stream';
import ghPages from 'gulp-gh-pages';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import chalk from 'chalk';

let isWatching = false;
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 10 versions']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

const testLintOptions = {
  env: {
    mocha: true
  }
};

var doBundle = function(target, name='main.js', dest='.tmp/scripts') {
  return target.bundle()
    .on('error', function(e) {
      gutil.log('Browserify Error \n', e.toString() , '\n' + e.codeFrame);
    })
    .pipe(source(name))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(dest));
}

var watchBundle = function(target, name='main.js', dest='.tmp/scripts') {
  return watchify(target)
    .on('update', function (scriptIds) {
      scriptIds = scriptIds
        .filter(function(i) { return i.substr(0,2) !== './' })
        .map(function(i) { return chalk.blue(i.replace(__dirname, '')) });
      if (scriptIds.length > 1) {
        gutil.log(scriptIds.length + ' Scripts updated:\n* ' + scriptIds.join('\n* ') + '\nrebuilding...');
      } else {
        gutil.log(scriptIds[0] + ' updated, rebuilding...');
      }
      doBundle(target, name, dest);
    })
    .on('time', function (time) {
      gutil.log(chalk.green(name + ' built in ' + (Math.round(time / 10) / 100) + 's'));
    });
}

function babelize(outputDir = '.tmp'){
  return () => {

    let opts        = isWatching?watchify.args:{};
    let extensions  = ['.js', '.json', '.babel'];
    
    opts.extensions = extensions;
    opts.debug      = true;
    let bundle      = browserify(opts);
  
    if( isWatching ){
      bundle = watchify(bundle);
    }

    bundle.transform(babelify.configure({
      stage: 0 ,
      extensions: extensions,
      plugins: [require('babel-plugin-object-assign')]
    }));
    
    bundle.require('./app/scripts/main.babel', {
      entry: true
    });

    if( isWatching === true ){
      watchBundle(bundle);
    }
    
    return doBundle(bundle);

  }
}

gulp.task('babel', babelize());
// gulp.task('babel:build', babelize());


gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles', 'babel'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/imgs/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/imgs'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'CNAME',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('setWatch', () => {
  isWatching = true;
});

gulp.task('serve', ['setWatch', 'styles', 'babel', 'fonts'], () => {

  browserSync({
    notify: false,
    host: '127.0.0.1',
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    '.tmp/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['babel', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('deploy', ['build'], ()=>{
  return gulp.src('dist/**/*')
          .pipe(ghPages());
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
