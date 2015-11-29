import _ from 'lodash';
import uuid from 'uuid';
import pako from 'pako';

// The project class has to do more than
// just compress / serialize and de-serialize
// it also has to do stuff like exporting
// and importing files as well as the adapter
// by which the file will be transpiled with

// loading the adapter so far is not implemented
// but the transpilationg including handling of
// multiple files occur in the project folder.
// the project acheives that by making a hashmap
// of files each identifiable by its name

// a structure like
// {
//    "/foo/bar/baz.js": [jsonCode]
// }
// the import block allows
// interlinking of these files
// that co-exist inside a project
// the idea is to allow smart block support
// when a file is queried the path module is
// used to generate accesible paths and query
// files from the project view.
// It must be noted that each file exists in memory
// unless compressed and serialized in localForage
// The above structure henceforth is highly memory
// intensive

// when export occurs the exporter export every file
// recursively by creating a graph to walk and then
// walking the graph thus it builds a zip package
// which can then be saved and ran as without the
// requirement of the system

// while in debug mode the project runs by transpilation
// of the files in memory
// it must be noted that each transpiled file is cached
// and unless specific file is changed it is not rebuilt
// while running the files `browserify` isque module
// combines the file packages together.

// Although this is just a hack right now to make this
// work completely inside the browser in future versions
// when we have access to either a server or node-webkit
// fs module, this will actually occur using the real
// browserify toolkit.

class Project{
    constructor(fileName){
        if( !fileName ){
            fileName = `project_${uuid.v4()}`;
        }
        this.fileName = fileName;
    }

    async load(){
        try{
            let contents = await localForage.getItem(this.fileName);
            if( !contents ){
                await this.syncWithFireBase();
                contents = await localForage.getItem(this.fileName);
            }
            let decompressedContents = pako.inflate(contents, {
                to: 'string'
            });
            let struct = JSON.parse(decompressedContents);
        }catch(e){
            console.log("Error loading file", e);
        }
    }

    async syncWithFireBase(){

    }

    async upload(){

    }
};

export default Project;
