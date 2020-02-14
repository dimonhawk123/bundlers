const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const css = [     
    './src/styles/*.scss',    
];

const js = [        
    './src/scripts/*.js'
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

gulp.task('watch', function() {
    gulp.watch(css, gulp.series('styles'));
    gulp.watch(js, gulp.series('scripts'));
});

function clean() {
    return del(['./build/*']);
}

gulp.task('build', 
    gulp.series(clean,
        gulp.parallel('scripts', 'styles'))
);

gulp.task('dev', 
    gulp.series('build', 'watch')
);