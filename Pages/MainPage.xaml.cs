using NativeWebAppTryOut.PageModels;
using NativeWebAppTryOut.Utilities;

namespace NativeWebAppTryOut.Pages;

public partial class MainPage : ContentPage
{
    public MainPage(MainPageModel model)
    {
        InitializeComponent();
        BindingContext = model;

        // Configure WebView source based on environment
        SetWebViewSource();
    }

    private void SetWebViewSource()
    {
        string source = WebViewHelper.GetDevServerUrl();

        // For development, log the URL we're using
#if DEBUG
        Console.WriteLine($"Using WebView source: {source}");
        Task.Run(() => Task.Delay(1000)).ContinueWith(t =>
        {
            MainThread.BeginInvokeOnMainThread(() => WebView.EvaluateJavaScriptAsync($"window.location = '{source}';"));
        });
#endif
    }

    private void OnSendMessageButtonClicked(object sender, EventArgs e)
    {
        WebView.SendRawMessage($"Hello from C#!");
    }

    private async void OnHybridWebViewRawMessageReceived(object sender, HybridWebViewRawMessageReceivedEventArgs e)
    {
        MainThread.BeginInvokeOnMainThread(async () =>
        {
            await DisplayAlert("Raw Message Received", e.Message, "OK");
        });
    }
}