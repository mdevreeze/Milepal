﻿using CommunityToolkit.Maui;
using Microsoft.Extensions.Logging;
using Microsoft.Maui.Controls.Hosting;
using Syncfusion.Maui.Toolkit.Hosting;

namespace Milepal;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
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

#if DEBUG
        builder.Logging.AddDebug();
#endif

        return builder.Build();
    }
}