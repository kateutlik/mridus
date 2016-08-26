var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	del = require('del'),
    fileinclude = require('gulp-file-include'),
	express     = require('express'),
	path        = require('path'),
	gutil       = require('gulp-util'),
	tinylr      = require('tiny-lr'),
    spritesmith = require('gulp.spritesmith'),
	svgSprite = require('gulp-svg-sprite'),
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
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			remove: false
		}))
		.pipe( gulp.dest('dist/styles') )
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano());
});

gulp.task('fonts', function() {
	return gulp.src('www/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src(['www/scripts/**/*.js', '!www/scripts/vendors/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/scripts'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('vendors', function() {
    return gulp.src('www/scripts/vendors/*.js')
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
	return del(['dist/styles', 'dist/scripts', 'dist/images', 'dist/html', 'dist/index.html', 'dist/sprite']);
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

		gulp.watch('www/styles/**/*.scss', ['styles']);
		gulp.watch('www/scripts/**/*.js', ['scripts']);
		gulp.watch('www/**/*.html', ['fileinclude']);
		gulp.watch('www/images/*', ['images']);
	});
});
//todo https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/
gulp.task('sprite', function() {
    // var spriteData = gulp.src('./www/sprite/*.png').pipe(spritesmith({
    //             retinaSrcFilter: './www/sprite/*-2x.png',
    //             imgName: '../images/sprite.png',
    //             retinaImgName: 'sprite-2x.png',
    //             cssName: '_sprite.scss',
    //             algorithm: 'binary-tree',
    //             cssTemplate: './scss.template.handlebars',
    //             cssVarMap: function(sprite) {
    //                 sprite.name = 'icon-' + sprite.name
    //             }
    //         }));
    //
    // spriteData.img.pipe(gulp.dest('./dist/images/'));
    // spriteData.css.pipe(gulp.dest('./www/styles/'));
/*
	config                  = {
		mode                : {
			prefix          : "icon-%s",  // Prefix for CSS selectors
			view            : {         // Activate the «view» mode
				bust        : false,
				render      : {
					scss    : {
						dest: '_sprite.scss',
						// template: "./scss.template.handlebars"

					}
				},
				example: true
			}
		}
	};
*/
	var config = {
		shape: {
			spacing: {
				padding: 5
			}
		},
		mode: {
			css: {
				dest: "./",
				prefix: "icon-%s",
				layout: "diagonal",
				sprite: "images/sprite.svg",
				bust: false,
				render: {
					scss: {
						dest: "styles/helpers/_sprite.scss",
						template: "build/sprite-template.scss"
					}
				}
			}
		},
		variables: {
			mapname: "icons"
		}
	};


	gulp.src('./www/sprite/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./www/'));
});

gulp.task('default', ['vendors', 'scripts', 'images', 'fonts', 'sprite', 'styles', 'fileinclude', 'express', 'watch']);
gulp.task('build', ['clean', 'vendors', 'scripts', 'styles', 'fileinclude', 'images', 'fonts', 'sprite']);
gulp.task('heroku', ['vendors', 'scripts', 'styles', 'fileinclude', 'images', 'fonts', 'sprite']);