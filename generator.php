<?php
$data = [
    'folder-folder',
    'file-file',
    //ruby
    'rb-ruby',
    'erb:rb',
    'rdoc:rb',
    //js
    'ls-livescript',
    'js-javascript',
    'ejs-ejs',
    'jsx-jsx',
    'ts-typescript',
    'coffe-coffescript',
    'json-json',
    //xml
    'xml-xml',
    'html-html',
    'htm:html',
    //styles
    'css-css',
    'scss-sass',
    'sass:scss',
    'less-less',
    'styl-stylus',

    'ino-arduino',
    'pde:ino',
    'elm-elm',
    'go-go',
    'dart-dart',
    'c-c',
    'cpp-cpp',
    'hpp-cppheader',
    'elixir-elixir',
    'php-php',
    'sql-sql',
    'java-java',
    'class:java',
    'jar-jar',
    'py-python',
    'pyc:python',
    'pyo:python',
    'pyd:python',
    //shell
    'sh-shell',
    'command:sh',
    'bat-bat',
    //images
    'png-image',
    'jpg:png',
    'jpeg:png',
    'tiff:png',
    'ico:png',
    'bmp:png',
    'gif:png',
    'svg-svg',
    //audio
    'mp3-audio',
    'wav:mp3',
    'ogg:mp4',
    //video
    'mp4-video',
    'webm:mp4',
    //fonts
    'ttf-font',
    'eot:ttf',
    'woff:ttf',
    'woff2:ttf',

    'md-markdown',
    'markdown:md',
    //git
    'gitignore-git',
    'gitmodules-git',
    'gitattributes-git',
    //archives
    'zip-zip',
    'rar:zip',
    '7z:zip',
    'tgz:zip',
    'tar:zip',
    'gz:zip',
    'bzip:zip',
    
    'yml-yaml',
    'pdf-pdf',
    'todo-todo',
    'map-map',
    //text
    'txt-text',
    'htaccess:txt',
    'log:txt',
    'npmignore:txt',
    'htpasswd:txt',
    'conf:txt',
    'latte:txt',
    'ini-ini'
];

$out = "";
foreach($data as $item) {
    // alias
    if (strpos($item, ':') !== FALSE) {
        $alias = explode(':',$item);
        $out.= "{  ext:'$alias[0]', alias: '$alias[1]' },\n\t\t";
        continue;
    }
    $item = explode('-',$item);
    $out.= "{  ext:'$item[0]', css: '$item[1]' },\n\t\t";
    //normal
}
$css = '';
foreach($data as $item) {
    if (strpos($item, ':') === FALSE) {
        $item = explode('-',$item);
    $css.= "
.file-icon.icon-$item[1] {
    background: url('../svg/$item[1].svg');
}";
    }
}
$out = trim($out, ',');
$out = "define(function(require, exports, module) {
    \"use strict\";

    exports.definitions = [
        $out
    ];
});";
file_put_contents('config.js', $out);
file_put_contents('css.txt', $css);