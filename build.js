#!/usr/bin/env node

var fs = require('fs-extra'),
    path = require('path'),
    ejs = require('ejs'),
    marked = require('marked'),
    autoprefixer = require('autoprefixer-core'),
    moment = require('moment');

marked.setOptions({
    gfm: true,
    tables: true,
    smartyPants: true
});

// make sure there is a build folder
if (!fs.existsSync('build')) fs.mkdirSync('build');
if (!fs.existsSync('build/css')) fs.mkdirSync('build/css');

// compile the src/template.ejs file
var template = ejs.compile(fs.readFileSync('src/template.ejs').toString());

// render each post to the build folder
var posts = fs.readdirSync('./posts')
    .map(function(file) {
        var details = fs.statSync(path.join('./posts', file)),
            created = new Date(details.ctime);

        var baseName =  path.basename(file, '.md'),
            filePath = path.join('posts', file),
            destPath = path.join('build', baseName + '.html');

        var markdown = marked(fs.readFileSync(filePath).toString());
        var html = template({
            content: markdown,
            title: baseName.replace(/[-_]/g, " ")
        });

        return {
            html: html,
            destPath: destPath,
            created: created,
            name: baseName
        };
    })
    .sort(function(a, b) {
        return a.created < b.created;
    });

posts.forEach(function(data) {
    fs.writeFileSync(data.destPath, data.html);
});

// render src/index.ejs to build/index.html
var filePath = './src/index.ejs';
var destPath = './build/index.html';
var html = ejs.render(fs.readFileSync(filePath).toString(), {

    // convert ['name.md', 'name-two.md'] to
    // [
    //  { title: 'name', raw: 'name.html' },
    //  { title: 'name two', raw: 'name-two.html' }
    // ]
    posts: posts.map(function(data) {
        var baseName = path.basename(data.name, '.md');
        return {
            title: baseName.replace(/[-_]/g, " "),
            raw: baseName + '.html',
            created: moment(data.created).format('D/M/YY')
        }
    })
});
fs.writeFileSync(destPath, html);

// autoprefix css
var cssPath = './src/css/styles.css';
var cssDest = './build/css/styles.css';
var css = fs.readFileSync(cssPath).toString();
fs.writeFileSync(cssDest, autoprefixer.process(css).css);

// copy over assets
fs.copySync('src/img', 'build/img');
fs.copySync('.travis.yml', 'build/.travis.yml');
fs.copySync('src/CNAME', 'build/CNAME');
fs.copySync('src/robots.txt', 'build/robots.txt');
