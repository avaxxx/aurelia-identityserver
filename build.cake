#addin "Cake.Yarn"

///////////////////////////////////////////////////////////////////////////////
// ARGUMENTS
///////////////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Debug");
var isRelease = configuration == "Release";


///////////////////////////////////////////////////////////////////////////////
// SETUP / TEARDOWN
///////////////////////////////////////////////////////////////////////////////

Setup(ctx =>
{
   // Executed BEFORE the first task.
   Information($"Running tasks for {configuration}...");
   Information($"isRelease =  {isRelease}...");
});

Teardown(ctx =>
{
   // Executed AFTER the last task.
   Information($"Finished running tasks.");
});

///////////////////////////////////////////////////////////////////////////////
// TASKS
///////////////////////////////////////////////////////////////////////////////


Task("Restore")
  .Does(() =>
{
    DotNetCoreRestore("./");
});

Task("Build")
    .IsDependentOn("Restore")
  .Does(() =>
{
    DotNetCoreBuild("./");
});

Task("YarnBuild").IsDependentOn("Build")
.Does(() =>
{
    Yarn.Install();
    if (isRelease)
    {
        Yarn.RunScript("webpack:prod");
    }
    else
    {
        Yarn.RunScript("webpack:dev");
    }
});

Task("Default").IsDependentOn("YarnBuild");

Task("Publish").IsDependentOn("Restore")
    .Does(() =>
{
    DotNetCorePublishSettings publishSettings = new DotNetCorePublishSettings()
    {
        Configuration = configuration,
        OutputDirectory = $"./publish/{configuration}/"
    };

    DotNetCorePublish("./", publishSettings);
});

RunTarget(target);