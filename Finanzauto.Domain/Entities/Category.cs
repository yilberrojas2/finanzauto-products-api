namespace Finanzauto.Domain.Entities;

public class Category
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public string ImageUrl { get; private set; } = null!;

    protected Category() { }

    public Category(string name, string imageUrl)
    {
        Id = Guid.NewGuid();
        Name = name;
        ImageUrl = imageUrl;
    }
}