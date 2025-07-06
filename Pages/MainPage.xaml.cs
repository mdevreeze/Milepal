using Milepal.Utilities;

namespace Milepal.Pages;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
        
        // Configure WebView source based on environment
        SetWebViewSource();
    }

    private void SetWebViewSource()
    {
        string source = WebViewHelper.GetWebViewSource();

        // For development, log the URL we're using
#if DEBUG
        Console.WriteLine($"Using WebView source: {source}");
#endif

        WebView.Source = source;
    }
}