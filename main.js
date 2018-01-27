/* jshint esversion: 6 */
const commandLineArgs = require('command-line-args');
const commandLineCommands = require('command-line-commands');
const optdef = require('./optdef');
const help = require('./help');
const path = require('path');
const cpext = require('cpexternalizer');

// Parse the input command
const validCommands = [null, 'extract', 'soundfix', 'help', 'dirext', 'xcpext'];
const {
    command,
    argv
} = commandLineCommands(validCommands);

let parsedOptions = {};

switch (command) {
    case null:
    case 'extract':
        // default action
        parsedOptions = commandLineArgs(optdef.extract, {
            argv: argv
        });
        cpext.extract(parsedOptions.src,
            parsedOptions.outdir,
            settings.samplePath, {
                cpproj: parsedOptions.cpproj,
                extracomp: parsedOptions.extracomp
            }
        );
        break;
    case 'dirext':
        parsedOptions = commandLineArgs(optdef.dirextract, {
            argv: argv
        });
        cpext.dirextract(
            parsedOptions.src,
            parsedOptions.outdir
        );
        break;
    case 'xcpext':
        parsedOptions = commandLineArgs(optdef.extract, {
            argv: argv
        });
        cpext.xcpextract(
            parsedOptions.src,
            parsedOptions.outdir,
            path.join('./CPM-sample.js')
        );
        break;
    case 'soundfix':
        parsedOptions = commandLineArgs(optdef.soundfix, {
            argv: argv
        });
        cpext.soundfix(
            parsedOptions.src,
            parsedOptions.ulpath
        );
        break;
    case 'help':
        help();
        break;
    default:
        // call help
        console.log('Command not regconized. Please call help by "node main.js help"');
}