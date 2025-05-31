using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace NativeWebAppTryOut.PageModels;

public partial class MainPageModel : ObservableObject
{
    [RelayCommand]
    private async Task Appearing()
    {
    }
}