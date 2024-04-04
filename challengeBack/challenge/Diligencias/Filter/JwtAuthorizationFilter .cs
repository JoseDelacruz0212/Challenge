using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

public class JwtAuthorizationFilter : IAsyncAuthorizationFilter
{
    private readonly IConfiguration _configuration;

    public JwtAuthorizationFilter(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var authHeader = context.HttpContext.Request.Headers["Authorization"];
        if (StringValues.IsNullOrEmpty(authHeader))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var token = authHeader.ToString().Split(" ").LastOrDefault();
        if (string.IsNullOrEmpty(token))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
            ValidateIssuer = true,
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = _configuration["Jwt:Audience"],
            ValidateLifetime = true
        };

        SecurityToken validatedToken;
        ClaimsPrincipal principal = null;

        try
        {
            principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
        }
        catch (SecurityTokenValidationException)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        catch (Exception ex)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        context.HttpContext.User = principal;
    }
}
