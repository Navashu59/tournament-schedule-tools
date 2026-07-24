export default {
  fetch(request, env) {
    const url = new URL(request.url);
    let redirect = false;
    if (url.hostname === "www.tournamentscheduletools.org") {
      url.hostname = "tournamentscheduletools.org";
      redirect = true;
    }
    const redirects = {"/bracket-generator/":"/tournament-bracket-maker/","/round-robin-schedule-maker/":"/round-robin-generator/","/tournament-fixture-generator/":"/fixture-generator/"};
    if (redirects[url.pathname]) {
      url.pathname = redirects[url.pathname];
      redirect = true;
    }
    if (redirect) return Response.redirect(url.toString(), 301);
    return env.ASSETS.fetch(request);
  }
};
