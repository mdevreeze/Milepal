using NativeWebAppTryOut.PageModels;

namespace NativeWebAppTryOut.Pages;

public partial class MainPage : ContentPage
{
    public MainPage(MainPageModel model)
    {
        InitializeComponent();
        BindingContext = model;
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