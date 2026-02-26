namespace Finanzauto.Domain.Entities;

public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public decimal Price { get; private set; }
    public Guid CategoryId { get; private set; }
    public DateTime CreatedAt { get; private set; }

    protected Product() { }

    public Product(string name, decimal price, Guid categoryId)
    {
        Id = Guid.NewGuid();
        Name = name;
        Price = price;
        CategoryId = categoryId;
        CreatedAt = DateTime.UtcNow;
    }
}