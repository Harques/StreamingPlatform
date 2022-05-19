FROM tiangolo/nginx-rtmp

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /www/

#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["BitirmeTezi.csproj", "."]
RUN dotnet restore "./BitirmeTezi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "BitirmeTezi.csproj" -c Release -o /app/build

FROM build AS publish
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm   
RUN dotnet publish "BitirmeTezi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BitirmeTezi.dll"]