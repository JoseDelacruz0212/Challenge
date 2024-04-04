using Challenge.Controllers;
using Challenge.Models.Authentication;
using Challenge.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Threading.Tasks;

namespace ChallengeTests.Tests.Controllers
{
    [TestFixture]
    public class AuthControllerTests
    {
        [Test]
        public async Task Login_ValidCredentials_ReturnsToken()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
            authServiceMock.Setup(service => service.AuthenticateAsync(It.IsAny<string>(), It.IsAny<string>()))
                           .ReturnsAsync("mockedToken");

            var controller = new AuthController(authServiceMock.Object);
            var loginRequest = new LoginRequest
            {
                Email = "jodelacruz0212@gmail.com",
                Password = "asd"
            };

            // Act
            var result = await controller.Login(loginRequest) as ContentResult;

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Content, Is.EqualTo("mockedToken"));
            Assert.That(result.ContentType, Is.EqualTo("application/json"));
        }

        [Test]
        public async Task Login_InvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
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
            Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
        }
    }
}
