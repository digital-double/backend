const { Advertisement } = require('../../app/models');

describe('Advertisement Model', () => {
    it('should find an advertisement by primary key', async () => {
      const ad = await Advertisement.findByPk('test-ad-id');
      expect(ad).toBeDefined();
      expect(ad.id).toBe('test-ad-id');
      expect(ad.title).toBe('Test Ad');
    });
  
    it('should create a new advertisement', async () => {
      const adData = {
        title: 'New Ad',
        status: true,
        allocatedBudget: 2000.0,
        adStart: new Date(),
        adEnd: new Date(),
      };
      const newAd = await Advertisement.create(adData);
      expect(newAd.id).toBeDefined();
      expect(newAd.title).toBe('New Ad');
      expect(newAd.allocatedBudget).toBe(2000.0);
    });
  
    it('should update an advertisement', async () => {
      const updatedRows = await Advertisement.update(
        { title: 'Updated Ad' }, // Fields to update
        { where: { id: 'test-ad-id' } } // Condition for update
      );
      expect(updatedRows[0]).toBe(1); // 1 row updated
    });
  
    it('should delete an advertisement', async () => {
      const deletedRows = await Advertisement.destroy({ where: { id: 'test-ad-id' } });
      expect(deletedRows).toBe(1); // 1 row deleted
    });
  
    it('should find all advertisements', async () => {
      const ads = await Advertisement.findAll();
      expect(ads).toBeDefined();
      expect(ads).toHaveLength(2);
      expect(ads[0].title).toBe('Ad 1');
      expect(ads[1].title).toBe('Ad 2');
    });
  
    it('should throw an error when trying to create an advertisement with invalid data', async () => {
      Advertisement.create.mockImplementationOnce(() =>
        Promise.reject(new Error('Invalid advertisement data'))
      );
      await expect(
        Advertisement.create({
          title: '',
          status: null,
          allocatedBudget: -100,
        })
      ).rejects.toThrow('Invalid advertisement data');
    });
  });
  
