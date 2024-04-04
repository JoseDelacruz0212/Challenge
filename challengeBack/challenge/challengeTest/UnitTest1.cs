using Challenge.Controllers;
using Challenge.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Identity.Data;

namespace ChallengeTests.Tests.Controllers
{
    public class AuthControllerTests
    {
        [Fact]
        public async Task Login_ValidCredentials_ReturnsToken()
        {
            // Arrange
            var userServiceMock = new Mock<UserService>(/* pasar argumentos requeridos aquí */);
            var configurationMock = new Mock<IConfiguration>();
            configurationMock.SetupGet(x => x["Jwt:Key"]).Returns("your-jwt-key");
            configurationMock.SetupGet(x => x["Jwt:Issuer"]).Returns("your-jwt-issuer");
            configurationMock.SetupGet(x => x["Jwt:Audience"]).Returns("your-jwt-audience");

            var authServiceMock = new Mock<AuthService>(userServiceMock.Object, configurationMock.Object);
            authServiceMock.Setup(service => service.AuthenticateAsync(It.IsAny<string>(), It.IsAny<string>()))
                           .ReturnsAsync("mockedToken");

            var controller = new AuthController(authServiceMock.Object);
            var loginRequest = new LoginRequest
            {
                Email = "johndoe@example.com",
                Password = "password123"
            };

            // Act
            var result = await controller.Login(loginRequest) as ContentResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal("mockedToken", result.Content);
            Assert.Equal("application/json", result.ContentType);
        }

        [Fact]
        public async Task Login_InvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var userServiceMock = new Mock<UserService>(/* pasar argumentos requeridos aquí */);
            var configurationMock = new Mock<IConfiguration>();
            configurationMock.SetupGet(x => x["Jwt:Key"]).Returns("your-jwt-key");
            configurationMock.SetupGet(x => x["Jwt:Issuer"]).Returns("your-jwt-issuer");
            configurationMock.SetupGet(x => x["Jwt:Audience"]).Returns("your-jwt-audience");

            var authServiceMock = new Mock<AuthService>(userServiceMock.Object, configurationMock.Object);
            authServiceMock.Setup(service => service.AuthenticateAsync(It.IsAny<string>(), It.IsAny<string>()))
                           .ReturnsAsync((string)null);

            var controller = new AuthController(authServiceMock.Object);
            var loginRequest = new LoginRequest
            {
                Email = "invalid@example.com",
                Password = "invalidpassword"
            };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            Assert.IsType<UnauthorizedResult>(result);
        }
    }
}
