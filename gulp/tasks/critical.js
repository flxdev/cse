import gulp from 'gulp';
import config from '../config';
import critical from 'critical';

gulp.task('critical', () => gulp.src([`${config.dest.html}/**/*.html`])
  .pipe(critical.stream({
    base: config.dest.html,
    inline: true,
    minify: true,
    extract: true,
    css: [config.dest.css + '/app.css']
  }))
  .pipe(gulp.dest(config.dest.html))
);

gulp.task('critical:watch', () => {
  gulp.watch(`${config.dest.html}/**/*.html`, ['critical']);
});

