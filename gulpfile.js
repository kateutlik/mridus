var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
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
    fileinclude = require('gulp-file-include');

// Html
gulp.task('fileinclude', function() {
	gulp.src(['./www/html/**/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist/html'));
});

// Styles
gulp.task('styles', function() {
	return sass('www/styles/**/*.scss', { style: 'expanded' })
		.pipe(autoprefixer('Android 2.3',
			'Android >= 4',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'))
		.pipe(csscomb())
		.pipe(gulp.dest('dist/styles'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'));
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
		.pipe(gulp.dest('dist/scripts'));
});

// Images
gulp.task('images', function() {
	return gulp.src('www/images/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function() {
	return del(['dist/styles', 'dist/scripts', 'dist/images', 'dist/html']);
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'images', 'fileinclude');
});

// Watch
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('www/_styles/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('www/_scripts/**/*.js', ['scripts']);

	// Watch image files
	gulp.watch('www/_images/**/*', ['images']);


	// Create LiveReload server
	livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['dist/**']).on('change', livereload.changed);
});
