namespace Finanzauto.Domain.Entities
{
    public class Product
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = null!;
        public decimal Price { get; private set; }
        public bool IsActive { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Guid CategoryId { get; private set; }
        public Category Category { get; private set; } = null!;

        private Product() { }

        public Product(string name, decimal price, Guid categoryId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Price = price;
            CategoryId = categoryId;
            IsActive = true;
            CreatedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            IsActive = false;
        }
    }
}