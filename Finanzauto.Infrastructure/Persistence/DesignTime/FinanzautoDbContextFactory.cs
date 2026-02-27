using Finanzauto.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Finanzauto.Infrastructure.Persistence.DesignTime
{
    public class FinanzautoDbContextFactory
        : IDesignTimeDbContextFactory<FinanzautoDbContext>
    {
        public FinanzautoDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<FinanzautoDbContext>();

            optionsBuilder.UseNpgsql(
                "Host=localhost;Port=5432;Database=finanzauto;Username=admin;Password=admin"
            );

            return new FinanzautoDbContext(optionsBuilder.Options);
        }
    }
}