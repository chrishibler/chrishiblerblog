---
title: "Enable CORS in ASP.NET Core (WebAPI)"
date: "2025-01-20"
author: "Chris Hibler"
description: "How to enable CORS in ASP.NET Core"
---

# How to Enable CORS in ASP.NET Core

Cross-Origin Resource Sharing (CORS) is a mechanism that allows web applications to access resources from different domains. By default, browsers block cross-origin HTTP requests for security reasons. However, you can enable CORS in an ASP.NET Core application to allow such requests when needed. This article will guide you through enabling CORS step-by-step in an ASP.NET Core application using the modern minimal hosting model.

### Why Do You Need CORS?

Imagine you have a front-end application hosted at `https://frontend.example.com` trying to access an API hosted at `https://api.example.com`. Without CORS enabled, the browser will block this request, resulting in a _CORS policy error_. Enabling CORS allows you to specify which domains can access your API securely.

---

### Step 1: Add CORS Services

The first step is to add the CORS services to your application.

1. Open the `Program.cs` file.
2. Register the CORS services using `AddCors` in the service configuration section:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("https://frontend.example.com") // Replace with your allowed origins
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

var app = builder.Build();
```

Alternatively you may use `options.AddDefaultPolicy` to avoid having to specify and reference a name.

### Step 2: Apply the CORS Policy

You need to apply the CORS policy to your application. There are two main ways to do this: globally or for specific endpoints.

#### Globally

To enable the policy for all controllers, use the `UseCors` middleware in the request pipeline configuration:

```csharp
app.UseCors("AllowSpecificOrigins"); // Apply CORS policy globally

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

#### Per Endpoint

To enable CORS for specific endpoints, use the `[EnableCors]` attribute:

```csharp
[ApiController]
[Route("api/[controller]")]
public class MyController : ControllerBase
{
    [HttpGet]
    [EnableCors("AllowSpecificOrigins")]
    public IActionResult Get()
    {
        return Ok("CORS is enabled for this endpoint.");
    }
}
```

---

### Step 3: Allow All Origins (Optional)

If you want to allow all origins, you can modify the CORS policy as follows:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});
```

Then, use `"AllowAll"` as the policy name when applying CORS globally or per endpoint. **Note**: Allowing all origins may expose your API to security risks, so use it with caution.

### Step 4: Testing the CORS Setup

Once you've configured CORS, test it by sending a request from a different origin using a tool like Postman, a browser, or your front-end application. Check the response headers for the `Access-Control-Allow-Origin` entry to confirm that CORS is working as expected.

### Common Issues and Troubleshooting

1. **Policy Not Applied:** Ensure the policy name in `UseCors` matches the one defined in `AddCors`.
2. **Options Requests Failing:** If your API has complex requests, ensure the `OPTIONS` method is allowed.
3. **Misconfigured Origins:** Double-check the domain names in the `WithOrigins` method.

### Conclusion

Enabling CORS in ASP.NET Core using the modern hosting model is straightforward and ensures secure cross-origin resource sharing. By understanding and configuring CORS policies effectively, you can enhance your application's interoperability while maintaining security.

If you found this guide helpful, feel free to share it with your peers!
