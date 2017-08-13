using System.Threading.Tasks;

namespace AuAuth.IdentityServer.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
