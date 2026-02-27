using Finanzauto.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Finanzauto.Infrastructure.Persistence;

public class FinanzautoDbContext : DbContext
{
    public FinanzautoDbContext(DbContextOptions<FinanzautoDbContext> options)
        : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Categories");

            entity.HasKey(c => c.Id);

            entity.Property(c => c.Name)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(c => c.ImageUrl)
                  .IsRequired();
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");

            entity.HasKey(p => p.Id);

            entity.Property(p => p.Name)
                  .IsRequired()
                  .HasMaxLength(150);

            entity.Property(p => p.Price)
                  .IsRequired();

            entity.Property(p => p.CreatedAt)
                  .IsRequired();

            entity.Property(p => p.CategoryId)
                  .IsRequired();

            entity.HasOne(p => p.Category)
                  .WithMany()
                  .HasForeignKey(p => p.CategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
    }
}