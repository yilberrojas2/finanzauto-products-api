# =========================
# BUILD STAGE
# =========================
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy project files
COPY Finanzauto.Api/*.csproj Finanzauto.Api/
COPY Finanzauto.Application/*.csproj Finanzauto.Application/
COPY Finanzauto.Domain/*.csproj Finanzauto.Domain/
COPY Finanzauto.Infrastructure/*.csproj Finanzauto.Infrastructure/

# Restore only API dependencies
RUN dotnet restore Finanzauto.Api/Finanzauto.Api.csproj

# Copy full source
COPY . .

# Publish
RUN dotnet publish Finanzauto.Api/Finanzauto.Api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

# =========================
# RUNTIME STAGE
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app

EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Finanzauto.Api.dll"]