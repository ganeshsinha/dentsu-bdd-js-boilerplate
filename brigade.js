const { Job } = require("brigadier")
const devops = require("devops-brigade");

// TODO: The notifyInfoAsync method requires a Microsoft Teams webhook - see
// https://confluence-engineering.dentsuaegis.com/display/GD/Send+notifications+to+Teams+channel
// or comment them out until ready

class JobFactory {
  createBuildJob(e, project) {
    var build = new Job("build", "node")
    build.storage.enabled = true

    let taskFactory = new devops.BuildTaskFactory(e, project)
    build.tasks = [
      "cd /src",
      "git config --global credential.helper 'store'",
      // TODO: replace with gitea token
      `echo https://${project.secrets.giteauser}:${project.secrets.giteapass}@gitea-tooling.az.devops.gdpdentsu.net > ~/.git-credentials`,
      taskFactory.gitVersion(),
      taskFactory.npmVersion(),
      "npm install",
      taskFactory.storeBuild()
    ]

    return build;
  }
}

// TODO: notification via teams on error - remove if not using teams
// devops.Events.enableNotifyOnError();

devops.Events.onPushDevelop(async (e, project) => {
  let jobFactory = new JobFactory();

  await jobFactory.createBuildJob(e, project).run();
  await devops.Standard.approveAsync({ gitOnly: true });
  await devops.Standard.publishNpmPackageAsync({ allowRepoNameMismatch: true });
});

devops.Events.onPushOther(async (e, project) => {
  new JobFactory().createBuildJob(e, project).run();
});

exports.JobFactory = JobFactory

