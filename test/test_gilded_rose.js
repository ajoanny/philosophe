var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
var gilded = require('../src/gilded_rose_golden_master');

//
// AgedBrie
//
//

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
});

describe("Approche 'classique'", function() {
  describe("Item normal", function() {
    it("le nombre de jours vendable diminu", function() {
      const gildedRose = new Shop([ new Item("foo", 10, 0) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
    });

    it("la qualité baisse", function() {
      const gildedRose = new Shop([ new Item("foo", 10, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
    });

    it("la qualité baisse quand le date de pérempetion est passéz", function() {
      const gildedRose = new Shop([ new Item("foo", 0, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(3);
    });

    it("la qualité n'est pas négative", function() {
      const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe("Aged Brie", function() {
    it("la qualité augmente", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", 10, 0) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(1);
    });

    it("la qualité max est 50", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", 9, 50) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(8);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe("Backstage passes", function() {
    it("la qualité augmente de 3 quand il reste 5 jours ou moins", function() {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(8);
    });

    it("la qualité augmente de 2 quand il reste 10 jours ou moins", function() {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(7);
    });

    it("la qualité passe à 0 quand il 0 jour", function() {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(0);
    });

    it("la qualité augmente de 1 quand il reste plus de 10 jours", function() {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(6);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", function() {
    it("la qualité ne change pas", function() {
      const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 10, 80) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(80);
    });

    it("la qualité ne change pas", function() {
      const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", -1, 80) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(80);
    });
  });
});

describe('GoldenMaster', function () {
  it("la qualité est mise à jour", function() {
    const original = new Shop([
      new Item("foo", 5, 1),
      new Item("Aged Brie", 6, 40),
      new Item("Aged Brie", 2, -1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49),
      new Item("Sulfuras, Hand of Ragnaros", 6, 80),
      new Item("Sulfuras, Hand of Ragnaros", 6, 65),
    ]);
    const refacto  = new gilded.Shop([
      new Item("foo", 5, 1),
      new Item("Aged Brie", 6, 40),
      new Item("Aged Brie", 2, -1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49),
      new Item("Sulfuras, Hand of Ragnaros", 6, 80),
      new Item("Sulfuras, Hand of Ragnaros", 6, 65),
    ]);

    for(let i = 0; i < 100; i++) {
      originalItems = original.updateQuality();
      refactoItems = refacto.updateQuality();

      expect(originalItems).to.deep.equal(refactoItems);
    }
  });
})