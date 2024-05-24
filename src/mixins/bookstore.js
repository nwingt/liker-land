import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['nftGetBookstoreListItems']),
    bookstoreListItemsInHighlighted() {
      return this.filterBookstoreListItemsByLocale(
        this.nftGetBookstoreListItems('highlighted')
      );
    },
    bookstoreListItemsInHighlightedClassIdSet() {
      return new Set(
        this.bookstoreListItemsInHighlighted.map(item => item.classId).flat()
      );
    },
    bookstoreListItemsInFeatured() {
      return this.sortBookstoreListItemsByLocale(
        this.nftGetBookstoreListItems('featured').filter(
          item =>
            !(Array.isArray(item.classId)
              ? item.classId.some(id =>
                  this.bookstoreListItemsInHighlightedClassIdSet.has(id)
                )
              : this.bookstoreListItemsInHighlightedClassIdSet.has(
                  item.classId
                ))
        )
      );
    },
  },
  methods: {
    normalizeBookstoreListItems(items) {
      return items.map(item => {
        const isMultiple =
          Array.isArray(item.classId) && item.classId.length > 1;

        const newItem = {
          ...item,
          isMultiple,
          classId: isMultiple ? item.classId[0] : item.classId,
        };

        if (isMultiple) {
          newItem.classIds = item.classId;
        }

        return newItem;
      });
    },
    checkBookstoreListItemIsMatchedLocale(items) {
      return items.locales.some(l => this.$i18n.locale.includes(l));
    },
    filterBookstoreListItemsByLocale(books) {
      return books.filter(this.checkBookstoreListItemIsMatchedLocale);
    },
    sortBookstoreListItemsByLocale(books) {
      const sortedBooks = [...books];
      sortedBooks.sort((a, b) => {
        const aMatchedLocale = this.checkBookstoreListItemIsMatchedLocale(a);
        const bMatchedLocale = this.checkBookstoreListItemIsMatchedLocale(b);
        if (aMatchedLocale && !bMatchedLocale) {
          return -1;
        }
        if (!aMatchedLocale && bMatchedLocale) {
          return 1;
        }
        return 0;
      });
      return sortedBooks;
    },
  },
};
