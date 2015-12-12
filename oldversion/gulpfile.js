var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var map = require('gulp-sourcemaps');
var react =  require('gulp-react');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css',function() { // 编译less 并合并到一个文件中并最小化文件
	gulp.src('workflow/less/*.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(concat('main.css'))
	.pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
	.pipe(uglifycss())
	.pipe(gulp.dest('app/css/'))
});

gulp.task('js-tool',function() { // 编译所有的tool工具 并编译成符合AMD标准的模块 供调用
	gulp.src('workflow/js/util')
	.pipe(plumber())
	.pipe(map.init())
	.pipe(babel({
		modules: "amd"
	}))
	.pipe(jshint())
	.pipe(concat('tool.js'))
	.pipe(map.write())
	.pipe(uglify())
	.pipe(gulp.dest('app/js/'))
})
gulp.task('mainjs',function() {
	gulp.src('workflow/js/*.jsx')
	.pipe(plumber())
	.pipe(babel({
		modules: "amd"
	}))
	.pipe(react())
	.pipe(uglify())
	.pipe(gulp.dest('app/js/'))
})
gulp.task('reduce',function () { // compile redux action/store/reducer
	gulp.src('workflow/*/*.js')
	.pipe(plumber())
	.pipe(babel({
		modules: "amd"
	}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
})

gulp.task('react',function() { //  编译所有的JSX到component.js
	gulp.src('workflow/jsx/*.jsx')
	.pipe(plumber())
	.pipe(babel({
		modules: "amd"
	}))
	.pipe(react())
	.pipe(jshint())
	.pipe(uglify())
	//.pipe(concat('component.js'))  为了便于观察暂时不合并文件
	//.pipe(uglify())
	.pipe(gulp.dest('app/js/component/'))
});

var watch1 = gulp.watch('workflow/jsx/*.jsx',['react','js-tool']);
watch1.on('change',function(even) {
	console.log('File ' + even.path + ' was ' + even.type + ',running task...')
});

var watch2 = gulp.watch('workflow/less/*.less',['css']);
watch2.on('change',function(even) {
	console.log('File ' + even.path + ' was ' + even.type + ',running task...')
});

var watch3 = gulp.watch('workflow/js/*.jsx',['mainjs']);
watch3.on('change',function(even) {
	console.log('File ' + even.path + ' was ' + even.type + ',running task...')
});

var watch4 = gulp.watch('workflow/*/*.js',['reduce']);
watch4.on('change',function(even) {
	console.log('File ' + even.path + ' was ' + even.type + ',running task...')
});





