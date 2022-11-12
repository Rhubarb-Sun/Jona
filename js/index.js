// 导航栏显示消失
$(function(){
  $(window).scroll(function() {
    let scrollY = $(document).scrollTop();
    // console.log(scrollY);
    if (scrollY > 165) {
      $('#nav').slideDown(400);
    } else {
      $('#nav').slideUp(400);
    }
  })
})

$(function(){
  $(window).scroll(function() {
    let scrollY = $(document).scrollTop();
    // console.log(scrollY);
    if (scrollY > 500) {
      $('.main-right').css('position', 'fixed')
        .css("top", "-180px").css("right", "187.5px");
    } else {
      $('.main-right').css('position', 'absolute')
      .css("top", "0").css("right", "65px");
    }

    if (scrollY > 260) {
      $('.main-left').css('position', 'fixed')
        .css("top", "58px").css("left", '122.5px');
    } else {
      $('.main-left').css('position', 'absolute')
       .css("top", "0").css("left", '0');
    }
  })
})

$('.nav-center-search input').focus(function() {
  $('.nav-center-search .search-history').show();
  $('.nav-center-search .active').css('color', '#ff8200');
})

$('.nav-center-search input').blur(function() {
  $('.nav-center-search .search-history').hide();
  $('.nav-center-search .active').css('color', 'black');
})

$('.nav-center-functions .nav-center-mode').click(function() {
  $('.nav-center-functions .nav-center-mode').toggleClass('icon-yueliang');
  // $('body').css('background-color', 'black');
})

// generate nav bar
// $.ajax({
//   url:"https://www.fastmock.site/mock/2bf039236c5455dd8e783a77b0901524/api/nav",
//   type:"get",
//   success:function(res) {
//     console.log(res);
//   }
// })

$.ajax({
  url:"https://www.fastmock.site/mock/e190dfd2c2243661705bbe24d1d0ed3f/api/hotsearch",
  type:'get',
  success: function(res) {
    // console.log(res);
    // let seeFull = document.getElementsByClassName("see-full-trends");
    function sortByKey(key) {
      return function(o1, o2) {
        let val1 = o1[key];
        let val2 = o2[key];
        return val2 - val1;
      }
    };
    let oArr = res.hotsearch.sort(sortByKey("number"));

    for (let i = 0; i < oArr.length - 1; i++) {
      let oDiv = `
                    <div class="trend">
                      <div class="iconfont icon-${i + 1}"></div>
                      <div>${oArr[i].title}</div>
                      <div class="trend-views">${oArr[i].number}</div>
                      <div class="trend-status">${oArr[i].icon}</div>
                    </div>
                  `;
      $('.main-right-trends').append(oDiv);
    }
    let oDiv = `
                  <div class="trend">
                    <div class="iconfont icon-icon-test"></div>
                    <div>${oArr[9].title}</div>
                    <div class="trend-views">${oArr[9].number}</div>
                    <div class="trend-status">${oArr[9].icon}</div>
                  </div>
                  <div class="see-full-trends">查看完整热搜榜单</div>
                `;
    $('.main-right-trends').append(oDiv);
  },
  error: function(err) {
    console.log(err);
  }
})

// 博文流
$.ajax({
  url: 'https://www.fastmock.site/mock/e190dfd2c2243661705bbe24d1d0ed3f/api/article',
  type: 'get',
  success: function(res) {
    // console.log(res.article);
    loadArticles();

    function loadArticles() {
      let articleArr = res.article;
      let fiveArr = articleArr.splice(0, 5); // cut from beginning.
      for (let i = 0; i < fiveArr.length; i++) {
        // console.log(fiveArr[i]);
        let curArticle = fiveArr[i];
        console.log(curArticle);
        let articleElement = 
          `
          <div class="scroller-item">
            <div class="feed-avatar">
              <img src="${curArticle.imgUrl}" alt="avatar-img" />
              <span class="iconfont icon-renzheng"></span>
            </div>
            <div class="feed-head">
              <div class="head-nick">
                <div class="head-name">${curArticle.name}</div>
                <span class="${curArticle.icon1}"></span>
                <span class="${curArticle.icon2}"></span>
                <span class="${curArticle.icon3}"></span>
              </div>
              <div class="head-info">
                <div class="head-info-time">${curArticle.dateTime}</div>
                <div class="head-info-profile">${curArticle.sign}</div>
              </div>
            </div>
            <div class="feed-follow">
              <span class="iconfont icon-jiahao1"></span>
              关注
            </div>
            <div class="blog">
              <div>
                ${curArticle.content}
              </div>
              <img src="./images/blog/3.jpg" alt="avatar-img" />
              <img src="./images/blog/2.jpg" alt="" />
              <img src="./images/blog/1.jpg" alt="" />
              <img src="https://tvax1.sinaimg.cn/crop.0.0.179.179.180/005EMMyMly8gdvr1oqaanj304z04zaa2.jpg?KID=imgbed,tva&Expires=1644813492&ssig=UDYmlFQ1mr" alt="" />
            </div>
            <div class="toolbar">
              <div class="share">
                <span class="icon iconfont icon-fenxiang_2"></span>
                ${curArticle.share}
              </div>
              <div class="comment">
                <span class="icon iconfont icon-pinglun"></span>
                ${curArticle.message}
              </div>
              <div class="like">
                <span class="icon iconfont icon-dianzan"></span>
                ${curArticle.give}
              </div>
            </div>
          </div>
          `
        ;
        $('.main-scroller-container').append(articleElement);
      }
    }
  }
})
    /*
    {
    "imgUrl": "https://tvax1.sinaimg.cn/crop.0.0.1080.1080.180/8ba165efly8gdi8oxyiagj20u00u03zu.jpg?KID=imgbed,tva&Expires=1644816403&ssig=obrnzmf3bB",
    "name": "林静",
    "icon1": "flag",
    "icon2": "",
    "icon3": "",
    "dateTime": "2002-06-06 09:15:23",
    "sign": "2022北京冬奥会短道速滑混合团体接力冠军",
    "content": "议感名油形离流求全基听新类务边。基识半准她党马两属要存却主五少。引该对金学我问置便统清更家有变。或带备力速原历声由七信型民八也。",
    "image1": "https://wx3.sinaimg.cn/orj360/51b2d4d0gy1gzc9xecdzdj21xk19cnpd.jpg",
    "image2": "https://wx2.sinaimg.cn/orj360/0021wQhXgy1gzcuitzvffj61900u0q9702.jpg",
    "image3": "https://wx1.sinaimg.cn/orj360/006qg8Ebly1gzctypdqd5j30ib0dkgmj.jpg",
    "image4": "https://wx2.sinaimg.cn/orj360/6e0e3dcbly1gzcrhjxhorj224z24zkjm.jpg",
    "image5": "https://wx2.sinaimg.cn/orj360/51b2d4d0gy1gzc9zjym48j20qy0g6gte.jpg",
    "image6": "https://wx3.sinaimg.cn/orj360/51b2d4d0gy1gzc9xecdzdj21xk19cnpd.jpg",
    "image7": "https://wx2.sinaimg.cn/orj360/6e0e3dcbly1gzcrhjxhorj224z24zkjm.jpg",
    "image8": "https://wx1.sinaimg.cn/orj360/0021wQhXgy1gzcuiu81mjj61900u0q9f02.jpg",
    "image9": "https://wx3.sinaimg.cn/orj360/51b2d4d0gy1gzc9xecdzdj21xk19cnpd.jpg",
    "share": "121",
    "message": "123",
    "give": "123"
}
    */