using System.Net;

namespace NativeWebAppTryOut.Utilities;

public static class WebViewHelper
{
    public static string GetDevServerUrl()
    {
#if DEBUG
#if ANDROID
        // Android emulator uses 10.0.2.2 to access host machine
        return "http://10.0.2.2:3000";
        if (IsEmulator())
        {
            return "http://10.0.2.2:3000";
        }
        else
        {
            // Try to find the host IP for a physical device
            return $"http://{GetHostIpAddress()}:3000";
        }
#else
        return "http://localhost:3000";
#endif
#else
        // Use bundled assets in release mode
        return "file:///android_asset/wwwroot/index.html";
#endif
    }

    private static bool IsEmulator()
    {
#if ANDROID
        return Android.OS.Build.Fingerprint?.Contains("generic") == true ||
               Android.OS.Build.Model?.Contains("Emulator") == true;
#else
        return false;
#endif
    }

    private static string GetHostIpAddress()
    {
        try
        {
            // Get host name
            string hostName = Dns.GetHostName();

            // Get host IP addresses
            IPAddress[] addresses = Dns.GetHostAddresses(hostName);

            // Find IPv4 address that is likely to be the dev machine's network IP
            foreach (IPAddress address in addresses)
            {
                if (address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    string ip = address.ToString();
                    if (ip.StartsWith("192.168.") || ip.StartsWith("10.") || ip.StartsWith("172."))
                    {
                        return ip;
                    }
                }
            }

            // Fallback to a common development IP
            return "192.168.1.100";
        }
        catch
        {
            // Fallback if there's any exception
            return "192.168.1.100";
        }
    }

    public static bool IsDevServerRunning(string url)
    {
        try
        {
            using var client = new HttpClient();
            client.Timeout = TimeSpan.FromSeconds(2);
            var response = client.GetAsync(url).Result;
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }
}
