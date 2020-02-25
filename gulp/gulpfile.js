const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

const css = [     
    './src/styles/*.+(scss|sass|css)',    
];

const js = [        
    './src/scripts/*.js'
];

const img = [
    './src/img/*.+(jpg|png|jpeg|svg)',    
];

const fonts = [
    './src/fonts/*',   
];

gulp.task('styles', function() {
    return gulp.src(css)    
        .pipe(sourcemaps.init())    
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({            
            cascade: false
        }))        
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
    return gulp.src(js)
        .pipe(sourcemaps.init())   
        .pipe(concat('scripts.js'))   
        .pipe(babel())   
        .pipe(uglify({
            toplevel: true
        }))  
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('images', function() {
    return gulp.src(img)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('./build/images'))
})

gulp.task('fonts', function() {
    return gulp.src(fonts)
        .pipe(gulp.dest('./build/fonts'))
})

gulp.task('watch', function() {
    gulp.watch(css, gulp.series('styles'));
    gulp.watch(js, gulp.series('scripts'));
});

function clean() {
    return del(['./build/*']);
}

gulp.task('build', 
    gulp.series(clean,
        gulp.parallel('scripts', 'styles', 'images', 'fonts'))
);

gulp.task('dev', 
    gulp.series('build', 'watch')
);