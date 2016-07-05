var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del'),
    fileinclude = require('gulp-file-include'),
	express     = require('express'),
	path        = require('path'),
	gutil       = require('gulp-util'),
	tinylr      = require('tiny-lr'),
    process = require('process'),
	app = express(),
	server      = tinylr();

// Html
gulp.task('fileinclude', function() {
	gulp.src(['./www/**/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist'));
});

// Styles
gulp.task('styles', function() {
	return gulp.src('www/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('Android 2.3',
			'Android >= 4',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'))
		.pipe(csscomb())
		.pipe( gulp.dest('dist/styles') )
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe( livereload( server ));
});

gulp.task('sprite', function() {
	var spriteData =
		gulp.src('www/images/sprite/*.*') // путь, откуда берем картинки для спрайта
			.pipe(spritesmith({
				imgName: 'sprite.png',
				cssName: 'sprite.scss',
				cssFormat: 'scss',
				algorithm: 'binary-tree',
				cssTemplate: 'scss.template.mustache',
				cssVarMap: function(sprite) {
					sprite.name = 's-' + sprite.name
				}
			}));

	spriteData.img.pipe(gulp.dest('dist/images/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('dist/styles/')); // путь, куда сохраняем стили
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('www/scripts/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/scripts'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe( livereload( server ));
});

// Images
gulp.task('images', function() {
	return gulp.src('www/images/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function() {
	return del(['dist/styles', 'dist/scripts', 'dist/images', 'dist/html', 'dist/index.html']);
});

gulp.task('express', function() {
    var port = process.env.PORT || 3000;

	app.use(express.static(path.resolve('./dist')));
	app.listen(port);
	gutil.log('Listening on port:' + port);
});

gulp.task('watch', function () {
	server.listen(35729, function (err) {
		if (err) {
			return console.log(err);
		}

		gulp.watch('www/styles/**/*.sccs', ['styles']);
		gulp.watch('www/scripts/*.js', ['scripts']);
		gulp.watch('www/**/*.html', ['fileinclude']);
		gulp.watch('www/images/*', ['images']);
	});
});

gulp.task('default', ['scripts', 'styles', 'fileinclude', 'express', 'images', 'watch']);
gulp.task('build', ['clean', 'scripts', 'styles', 'fileinclude', 'images']);
gulp.task('heroku', ['scripts', 'styles', 'fileinclude', 'images']);