// Updated by king abhishek hingnikar
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

// Babel and friends
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

import {server} from 'electron-connect';
import del from 'del';
import source from 'vinyl-source-stream';
import ghPages from 'gulp-gh-pages';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import chalk from 'chalk';
import _ from 'lodash';
import bBuiltins from 'browserify/lib/builtins';
import shell from 'gulp-shell';

let isWatching = false;
const $ = gulpLoadPlugins();
const electron = server.create();

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

    const opts        = isWatching?watchify.args:{};
    opts.debug      = true;
    let bundle      = browserify(opts);

    if( isWatching ){
      bundle = watchify(bundle);
    }

    bundle.transform(babelify);

    bundle.require('app/scripts/main.js', {
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
  return gulp.src('app/fonts')
    .pipe(gulp.dest('.tmp/fonts'))
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
  electron.start();

  gulp.watch([
    'electron/*.html',
    'electron/styles/**/*.css',
    'electron/scripts/**/*.js',
    'electron/images/**/*',
    'electron/fonts/**/*'
  ]).on('change', electron.reload);

  gulp.watch('electron/runner.js', electron.restart);

  // do the good work of updating stuff
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
});


gulp.task('build', ['babel', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
