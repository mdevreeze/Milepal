using CommunityToolkit.Maui;
using Microsoft.Extensions.Logging;
using Microsoft.Maui.Controls.Hosting;
using Microsoft.Maui.Handlers;
using Syncfusion.Maui.Toolkit.Hosting;

namespace NativeWebAppTryOut;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.ConfigureMauiHandlers(handlers => {
            // Register HybridWebView handler
            handlers.AddHandler<HybridWebView, HybridWebViewHandler>();
        });
        builder
            .UseMauiApp<App>()
            .UseMauiCommunityToolkit()
            .ConfigureSyncfusionToolkit()
            .ConfigureMauiHandlers(handlers =>
            {
#if IOS || MACCATALYST
				handlers.AddHandler<Microsoft.Maui.Controls.CollectionView, Microsoft.Maui.Controls.Handlers.Items2.CollectionViewHandler2>();
#endif
            })
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                fonts.AddFont("SegoeUI-Semibold.ttf", "SegoeSemibold");
                fonts.AddFont("FluentSystemIcons-Regular.ttf", FluentUI.FontFamily);
            });

        builder.Services.AddScoped<MainPageModel>();
#if DEBUG
        builder.Services.AddHybridWebViewDeveloperTools();
        builder.Logging.AddDebug();
        builder.Services.AddLogging(configure => configure.AddDebug());
#endif

        return builder.Build();
    }
}