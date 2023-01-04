const klarSdk = (function () {
  const data = function () {return window.klar && window.klar.data} 
  
  return {
    currentPage: {
      get: function () {
        return data().pages.find(page => page._id === window.klar.sdk.currentPage.id());
      },
      set: function (data) {
        window.klar.data = data;
      },
      delete: function (id) {
        return 'TODO';
      },
      removeBlock: function (id) {
        window.klar.data.block[id];
      },
      id: function () {
        let currentPageId = localStorage.getItem('current-page');
        if (!currentPageId) {
          return window.klar.sdk.pages.get()[0]._id;
        }
        return currentPageId;
      }
    },
    page: {
      getByPath: function (path) {
        return data().pages.find(page => page._path === path);
      },
      get: function () {
        return 'data';
      },
      set: function () {
        return 'data';
      },
      delete: function () {
        return 'data';
      }
    },
    pages: {
      create: function (page) {
        data().pages.unshift(page);
      },
      get: function () {
        return data().pages;
      },
      startpage: function () {
        return data().pages.find(page => page.startpage === true);
      },
      getPage: function (id) {
        return data().pages.find(page => page.id === id);
      },
      setPagePath: function (id) {
        window.klar.data.pages.map(page => {
          if (page.id === id) {
            page._path = klar.sdk.pages.getPath(page);
          }
        });
      },
      getPath: function(pageToPathify) {
        const pages = klar.sdk.pages.get();
        var self = this;
        function getSlugs(parentId) {
          let slugs = [];
          pages.forEach((page, i) => {
            if (page._id === parentId) {
              slugs.push(page._slug);
              slugs = slugs.concat(getSlugs(page.meta.parent_id));
              // console.log(getPath(page.meta.parent_id));
              // console.log('comeon', slugs)
            }
          });
          return slugs;
        }
        const allSlugs = getSlugs(pageToPathify.meta.parent_id).reverse();
        allSlugs.push(pageToPathify._slug);
        // console.log(allSlugs)
        const path = '/' + allSlugs.join('/');
        // console.log(path)
        return path;
      },
      setPage: function (data) {
        window.klar.data.pages.map(page => {
          if (page.id === data.id) {
            page._menu_item_name = data._menu_item_name;
            page.meta.modified_at = data.meta.modified_at;
            page.meta.modified_by = data.meta.modified_by;
            page._meta.modified_at = data.meta.modified_at;
            page._meta.modified_by = data.meta.modified_by;
          }
        });
      },
      setSettings: function (id, data) {
        window.klar.data.pages.find(page => page.id === id).settings = data;
      },
      delete: function (id, isActive) {
        const pages = data().pages;
        const pageToDelete = klar.sdk.pages.getPage(id);
        const position = pageToDelete.meta.position;
        const parentId = pageToDelete.meta.parent_id;
        window.klar.data.pages = pages.filter(page => page.id !== id);
        if (isActive) {
          let setActivePage;
          if (position === 0) {
            setActivePage = klar.sdk.pages.getPage(parentId);
          } else {
            for (const page of pages) {
              if (page.meta.parent_id === parentId && page.meta.position === position - 1) {
                setActivePage = page;
                break;
              }
            }
          }
          if (setActivePage) {
            onePage.pageManager.renderPage(setActivePage.id);
          } else {
            // location.reload();
            // console.log('hmmm')
          }
        }
      },
      sort: function () {
        const pages = data().pages;
        function compareFn(a, b) {
          a = a.meta.position;
          b = b.meta.position;
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          // a must be equal to b
          return 0;
        }
        return pages.sort(compareFn)
      },
      reorder: function (config) {
        const pages = data().pages;
        
        const sort = function (arr, from, to) {
          const p = pages.find(page => (page.id === config.id) && (page.meta.parent_id !== config.parentId));
          if (p) {
            // Has changed parent
            from = to;
          }

          // Make sure a valid array is provided
          if (Object.prototype.toString.call(arr) !== '[object Array]') {
            throw new Error('Please provide a valid array');
          }
        
          // Delete the item from it's current position
          var item = arr.splice(from, 1);
        
          // Make sure there's an item to move
          if (!item.length) {
            throw new Error('There is no item in the array at index ' + from);
          }
        
          // Move the item to its new position
          arr.splice(to, 0, item[0]);
        };

        const filteredPages = pages.filter(page => {
         return page.meta.parent_id === config.parentId || page.id === config.id
        });
        if (filteredPages.length < 2) {
          pages.map(page => {
            if (page.id === config.id) {
              if (page.meta.parent_id !== config.parentId) {
                page.meta.parent_id = config.parentId;
                page.meta.position = 0;
              }
            }
          })
          return;
        }
        // console.log(filteredPages)
        sort(filteredPages, config.from, config.to);
        // console.log('parentId', config.parent_id)
        // console.log('parentId', config.id)
        let reorderedPages = [];
        let count = 0;
        filteredPages.map(page => {
          if (page.meta.parent_id === config.parentId) {
            page.meta.position = count++;
            // console.log(page.id, page.meta.position)
            // console.log('d')
          }
          if (page.id === config.id) {
            if (page.meta.parent_id !== config.parentId) {
              page.meta.parent_id = config.parentId;
              page.meta.position = count++;
              // console.log(page.id, page.meta.position)
              // console.log('ny')
            }
          }
          // reorderedPages.push(page);
        });
        // console.log(reorderedPages)
        // data().pages = reorderedPages;
        // if (filteredPages.length) {
        //   sort(pages, config.from, config.to);
        //   let count = 0;
        //   reorderdPages = pages.map(page => {
        //     // console.log(config.condition['meta.parent_id']);
        //     // console.log(config.condition[Object.keys(config.condition)[0]]);
        //     // console.log(page.meta.parent_id);
        //     if (page.meta.parent_id === config.parentId) {
        //       page.meta.parent_id = config.parentId;
        //       page.meta.position = count++;
        //       console.log('reordered page: ', page)
        //     }
        //   });
        // } else {
        //   pages.find((page) => {
        //     if (page.id === config.id) {
        //       page.meta.parent_id = config.condition[Object.keys(config.condition)[0]];
        //     }
        //   });
        //   data().pages = reorderdPages;
        //   // console.log(data().pages)
        //   return;
        // }
        // filteredPages.map((page, i) => page.meta.position = i);
        
    // query.exec(function(err, config) {
    //   if (err) {
    //     data.res.send(err);
    //     return;
    //   }
    //   var count = 0;
    //   for(var i in config) {
    //     var item = config[i];
    //     item = JSON.stringify(item);
    //     item = JSON.parse(item);
    //     if(parseInt(count) === parseInt(data.to)) { 
    //       count++;
    //     }
    //     if(item._id.toString() !== data.id.toString()) {
    //       console.log(count);
    //       var obj = {};
    //       obj[data.field] = count;
    //       data.model.update({ _id: item._id }, { $set: obj}, function (err, config) {
    //         if (err) {
    //           data.res.send(err); 
    //         } 
    //       });
    //       count++;
    //     }
    //   }
    //   var obj1 = {};
    //   obj1[data.field] = parseInt(data.to);
    //   if (data.parent_id) {
    //     obj1['meta.parent_id'] = data.parent_id;
    //   } else {
    //     obj1['meta.parent_id'] = null;
    //   }
    //   // var setUnset;
    //   // if (data.parent_id) {
    //   //   obj1['meta.parent_id'] = data.parent_id;
    //   //   setUnset = { $set: obj1 };
    //   // } else {
    //   //   // obj1['meta.parent_id'] = '';
    //   //   setUnset = { $set: obj1, $unset: { 'meta.parent_id': 1 } };
    //   // }

    //   data.model.update({ _id: data.id }, { $set: obj1 }, function (err, config) {
    //     if (err) {
    //       data.res.send(err);
    //     }
    //   });
    //   callback(err, config);
    // });
        // var reorderData = {
        //   to: position,
        //   sort: 'meta.position',
        //   field: 'meta.position',
        //   condition: {
        //     'meta.parent_id': parentId
        //   }
        // };
        
        // moveInArray(data().pages, currentIndex, position);
      }
    },
    block: {
      isGlobal: function (type) {
        let isGlobal = false;
        if (!type) {
          return false;
        }
        const blockType = onePage.dataFactory.getBlockSchema(type);
        if (blockType.global) {
            isGlobal = true
        }
        return isGlobal;
      },
      getBlocksToUpdate: function (type, returnFirst) {
        let returnFirstPage = false;
        let blocksToUpdate = [];
        const pages = window.klar.sdk.pages.get();
        for (let page of pages) {
          const blocks = page.blocks;
          // const blocksKeyArray = Object.keys(blocks);
          if (blocks) {
            for (let block of blocks) {
              const blockValue = block;
              if (blockValue._type === type) {
                if (returnFirst) {
                  if (returnFirst && !blockValue.style._unique_style) {
                    returnFirstPage = true;
                    blocksToUpdate = [];
                    blocksToUpdate.push({pageId: page._id, blockId: blockValue._id});
                    break;
                  }
                } else {
                  blocksToUpdate.push({pageId: page._id, blockId: blockValue._id});
                }
              }
            }
          }
          if (returnFirstPage) {
            break;
          }
        };
        return blocksToUpdate;
      },
      setGlobalBlockPart: function (type, field, value) {
        if (window.klarTimeoutIdForUpdateGlobalBlocksPart) {
          clearTimeout(window.klarTimeoutIdForUpdateGlobalBlocksPart);
        }
        window.klarTimeoutIdForUpdateGlobalBlocksPart = setTimeout(() => {upateGlobalBlocksPart()}, 500);
        function upateGlobalBlocksPart() {
          const blocksToUpdate = window.klar.sdk.block.getBlocksToUpdate(type);
          blocksToUpdate.forEach(({pageId, blockId}) => {
            // const page = window.klar.data.pages.find(page => page.id === pageId);
            // page.blocks[blockId][field] = value;
            // page.blocks[blockId].data[field] = value;
            let page = window.klar.data.pages.find(page => page.id === pageId);
            const indexToUpdate = page.blocks.map(b => b._id).indexOf(blockId);
            page.blocks[indexToUpdate][field] = value;
            page.blocks[indexToUpdate].data[field] = value;
          })
        }
      },
      setGlobalBlock: function (type, data, updateStyle) {
        if (window.klarTimeoutIdForUpdateGlobalBlocks) {
          clearTimeout(window.klarTimeoutIdForUpdateGlobalBlocks);
        }
        window.klarTimeoutIdForUpdateGlobalBlocks = setTimeout(() => {updateGlobalBlocks()}, 500);
        function updateGlobalBlocks() {
          const blocksToUpdate = window.klar.sdk.block.getBlocksToUpdate(type);
          // console.log('blocksToUpdate', blocksToUpdate);
          if (updateStyle) {
            blocksToUpdate.forEach(({pageId, blockId}) => {
              // const page = window.klar.data.pages.find(page => page.id === pageId);
              // const block = page.blocks[blockId];
              // if (!block.style._unique_style) {
              //   page.blocks[blockId].style = {...data};
              //   page.blocks[blockId].data.style = {...data};
              // }
              let page = window.klar.data.pages.find(page => page.id === pageId);
              const indexToUpdate = page.blocks.map(b => b._id).indexOf(blockId);
              if (!page.blocks[indexToUpdate].style._unique_style) {
                page.blocks[indexToUpdate].style = {...data};
                page.blocks[indexToUpdate].data.style = {...data};
              }
            })
          } else {
            blocksToUpdate.forEach(({pageId, blockId}) => {
              // const page = window.klar.data.pages.find(page => page.id === pageId);
              // const block = page.blocks[blockId];
              // page.blocks[blockId] = {...block, ...data, style: block.style};
              // page.blocks[blockId].data = {...data, style: block.style};
              let page = window.klar.data.pages.find(page => page.id === pageId);
              let block = page.blocks.find(b => b._id === blockId);
              const indexToUpdate = page.blocks.map(b => b._id).indexOf(blockId);
              page.blocks[indexToUpdate] = {...block, ...data, style: block.style};
              page.blocks[indexToUpdate].data = {...data, style: block.style};
            })
          }
        }
      },
      isUniqueStyle: function (type, uniqueStyle) {
        let isUniqueStyle = window.klar.sdk.block.isGlobal(type);
        if (!uniqueStyle) {
          isUniqueStyle = false;
        }
        return isUniqueStyle;
      },
      getGlobalBlockData: function (type) {
        const blocksToUpdate = this.getBlocksToUpdate(type, true);
        console.log(blocksToUpdate)
        if (blocksToUpdate && blocksToUpdate.length > 0) {
          const data = blocksToUpdate[0];
          const page = window.klar.data.pages.find(page => page.id === data.pageId);
          // let block = page.blocks[data.blockId];
          let block = page.blocks.find(b => b._id === data.blockId);
          return JSON.parse(JSON.stringify(block)); // The only way to really clone an object
        }
        return null;
      },
    },
    blocks: {
      get: function (templateId, blockId) {
        return onePage.dataFactory.getBlockData(templateId, blockId);
      },
      isGlobal: function (type) {
        let isGlobal = false;
        if (!type) {
          return false;
        }
        const blockType = onePage.dataFactory.getBlockSchema(type);
        if (blockType.global) {
            isGlobal = true
        }
        return isGlobal;
      },
      isUniqueStyle: function (type, uniqueStyle) {
        let isUniqueStyle = window.klar.sdk.blocks.isGlobal(type);
        if (!uniqueStyle) {
          isUniqueStyle = false;
        }
        return isUniqueStyle;
      },
      isGlobalAndHasContent: function (type) {
        let isGlobal = window.klar.sdk.blocks.isGlobal(type);
        if (isGlobal) {
          if (window.klar.sdk.blocks.getGlobalBlock(type)) {
            isGlobal = true
          }
        }
        return isGlobal;
      },
      setGlobalBlock: function (type, data, creating, updateStyle) {
        if (!window.klar.data.global) {
          window.klar.data.global = {};
        }
        if (!window.klar.data.global.blocks) {
          window.klar.data.global.blocks = {};
        }
        if (window.klar.data.global.blocks[type] && creating) {
          // Return, cause we don't want to override edited data
          return;
        }
        if (updateStyle) {
          window.klar.data.global.blocks[type].style = {...data};
          window.klar.data.global.blocks[type].data.style = {...data};
        } else {
          let block = window.klar.data.global.blocks[type];
          window.klar.data.global.blocks[type] = {...block, ...data};
          // window.klar.data.global.blocks[type]['data'] = data;
        }
      },
      getGlobalBlock: function (type) {
        if (!(window.klar.data.global && window.klar.data.global.blocks)) {
          // console.log('Global blocks is empty.');
          return false;
        }
        return window.klar.data.global.blocks[type]
      },
      sortNewBlock: function (config) {
        const page = window.klar.data.pages.find(page => page.id === onePage.dataFactory.getCurrentPageId());
        let blocks = page.blocks;
        
        const sort = function (arr, from, to) {
          // const b = blocks.find(b => (b._id === config.id) && (b.meta?.parent_id !== config.parentId));
          const b = blocks.find(b => (b._id === config.id));
          // if (b) {
          //   // Has changed parent
          //   from = to;
          // }

          // Make sure a valid array is provided
          if (Object.prototype.toString.call(arr) !== '[object Array]') {
            throw new Error('Please provide a valid array');
          }
        
          // Delete the item from it's current position
          var item = arr.splice(from, 1);
        
          // Make sure there's an item to move
          if (!item.length) {
            throw new Error('There is no item in the array at index ' + from);
          }
        
          // Move the item to its new position
          arr.splice(to, 0, item[0]);
        };

        sort(blocks, config.from, config.to);
      },
      sort: function (items) {
        function compareFn(a, b) {
          a = a._position;
          b = b._position;
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          // a must be equal to b
          return 0;
        }
        return items.sort(compareFn)
      },
      reorder: function (config) {
        const page = window.klar.data.pages.find(page => page.id === onePage.dataFactory.getCurrentPageId());
        let blocks = page.blocks;
        
        const sort = function (arr, from, to) {
          const b = blocks.find(b => (b.id === config.id));
          // if (b) {
          //   // Has changed parent
          //   from = to;
          // }

          // Make sure a valid array is provided
          if (Object.prototype.toString.call(arr) !== '[object Array]') {
            throw new Error('Please provide a valid array');
          }
        
          // Delete the item from it's current position
          var item = arr.splice(from, 1);
        
          // Make sure there's an item to move
          if (!item.length) {
            throw new Error('There is no item in the array at index ' + from);
          }
        
          // Move the item to its new position
          arr.splice(to, 0, item[0]);
        };

        sort(blocks, config.from, config.to);
        let count = 0;
        blocks.map(b => {
          b._position = count++;
        });
      },
    },
    pageTypes: {
      get: function (id) {
        return 'data';
      }
    },
    blockTemplates: {
      get: function () {
        return 'data';
      }
    },
    theme: {
      get: function () {
        return 'data';
      },
      set: function () {
        return 'data';
      },
      delete: function () {
        return 'data';
      }
    },
    reactApp: {
      navigate: function (path) {
        if (typeof path === 'undefined') {
          path = window.klar.sdk.currentPage.get()._path;
        }
        window.klar.navigate(path);
      }
    }
  }
})();