
import gulp, { dest } from "gulp";
import gpug from "gulp-pug";
import del from "del";
import WS from "gulp-webserver";
import image from "gulp-image";
import gSass, { logError } from "gulp-sass";
import autoPrefix from "gulp-autoprefixer";
import csso from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import gitDeploy from "gulp-gh-pages";

gSass.compiler = require("node-sass");
const routes = {
    pug:{
        src: "src/*.pug", 
        watch: "src/**/*.pug",
        dest:"dist"
    },
    scss:{
        watch:"src/scss/*",
        src: "src/scss/style.scss",
        dest: "dist/css"

    },
    img: {
        src: "src/img/*",
        dest: "dist/img"
      },
    js:{
        src: "src/js/main.js",
        dest:"dist/js",
        watch:"src/js/*"
    }

};

const js = () => gulp.src(routes.js.src)
.pipe(
    bro({
        transform: [ 
            babelify.configure({ presets: ['@babel/preset-env'] }),
            [ 'uglifyify', { global: true } ]
        ]
    }

    )
)
.pipe(gulp.dest(routes.js.dest));



const css = () => gulp.src(routes.scss.src)
        .pipe(gSass().on("error",logError))
        .pipe(autoPrefix({
            browsers: ["last 2 versions"]
        }))
        .pipe(csso())
        .pipe(dest(routes.scss.dest));

const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clear = () => del(["dist",".publish"]);

const webserver = () => gulp.src("dist/").pipe(WS({
    livereload: true,
    open: true
}));

const watchTarget = () =>{
    gulp.watch(routes.pug.watch,pug);
    gulp.watch(routes.img.src,img);
    gulp.watch(routes.scss.watch,css);
    gulp.watch(routes.js.watch,js);
    
};

const watch_img = () => gulp.watch(routes.img.src.img);

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const imgOpt = () =>{
    gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));} 

//위에 경우 async 에러 남, 화살표 함수가 {}감싸면 this 속성이 변함 주의😂😂😂😂😂

const GDP = () => gulp.src("dist/**/*").pipe(gitDeploy({
    origin: "SSHrepo",
    branch: "master"

})); ///problem ....

//내가 커맨드 할것만 export 하면댐
//img는 용량이커서 시간 많이 잡아먹으니까 prepare section에서 시행시키는게 나을듯, 계속 watch당하면 너무 비효율적임
const prepare = gulp.series([clear,img]);
const live = gulp.parallel([webserver,watchTarget]); //동시 실행
const assets =  gulp.series([pug,css,js]);


export const dev = gulp.series([prepare,assets,live]);
export const build = gulp.series([prepare,assets]);
export const deploy = gulp.series([build,GDP]);
export const wash = gulp.series([clear]);
 