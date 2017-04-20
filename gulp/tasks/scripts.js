var gulp = require('gulp'),
    webpack = require('webpack-stream');

/* gulp.task('scripts', function(callback) {
    webpack(require('../../webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback();
    });
});*/

gulp.task('scripts', function() {
    return gulp.src('./app/assets/scripts/App.js')
        .pipe(webpack(require('../../webpack.config.js')))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/scripts'));
});

//['modernizr'],