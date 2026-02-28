using Finanzauto.Application.Products.CreateProductBulk;
using Finanzauto.Application.Interfaces.Repositories;
using Finanzauto.Domain.Entities;
using Moq;
using Xunit;

public class CreateProductBulkServiceTests
{
    [Fact]
    public async Task Should_Create_Products_When_Category_Exists()
    {
        // Arrange
        var productRepo = new Mock<IProductRepository>();
        var categoryRepo = new Mock<ICategoryRepository>();

        var categoryId = Guid.NewGuid();
        categoryRepo
            .Setup(r => r.GetByIdAsync(categoryId))
            .ReturnsAsync(new Category("CLOUD", "img"));

        var service = new CreateProductBulkService(
            productRepo.Object,
            categoryRepo.Object);

        // Act
        var result = await service.ExecuteAsync(categoryId, 10);

        // Assert
        Assert.Equal(10, result);
        productRepo.Verify(r => r.BulkInsertAsync(It.IsAny<List<Product>>()), Times.Once);
    }
}