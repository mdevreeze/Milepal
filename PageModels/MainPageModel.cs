using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace NativeWebAppTryOut.PageModels;

public partial class MainPageModel : ObservableObject
{
    [ObservableProperty] private string _title = "RunScheduler";
    [ObservableProperty] private bool _isLoading = false;

    [RelayCommand]
    private async Task Appearing()
    {
        // Any initialization logic can go here
    }
}