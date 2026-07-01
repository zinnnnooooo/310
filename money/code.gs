// 웹앱에 접속했을 때 Index.html 파일을 보여주는 함수
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('환율 계산기')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 현재 실시간 환율 정보를 가져오는 함수
function getExchangeRates() {
  try {
    // 무료 환율 API 주소입니다. USD를 기준으로 여러 통화 환율을 가져옵니다.
    const apiUrl = 'https://open.er-api.com/v6/latest/USD';

    // 외부 API 호출 옵션입니다.
    const options = {
      muteHttpExceptions: true
    };

    // API에서 환율 데이터 가져오기
    const response = UrlFetchApp.fetch(apiUrl, options);
    const statusCode = response.getResponseCode();

    // 서버 응답이 정상 상태가 아니면 오류 처리
    if (statusCode !== 200) {
      throw new Error('환율 API 응답 오류: ' + statusCode);
    }

    // JSON 문자열을 자바스크립트 객체로 변환
    const data = JSON.parse(response.getContentText());

    // API 호출이 성공했는지 확인
    if (data.result !== 'success') {
      throw new Error('환율 데이터를 가져오지 못했습니다.');
    }

    // USD 기준 환율 데이터
    const rates = data.rates;

    // 필요한 통화 데이터가 모두 있는지 확인
    if (!rates.KRW || !rates.GBP || !rates.EUR || !rates.JPY || !rates.CNY) {
      throw new Error('필요한 통화 환율 정보가 없습니다.');
    }

    // 원화 기준으로 환산하기 위한 값
    const krwRate = rates.KRW;

    // UTC 시간을 한국 시간 기준으로 보기 좋게 바꿉니다.
    const updateTime = formatKoreaTime(data.time_last_update_unix);
    const nextUpdateTime = formatKoreaTime(data.time_next_update_unix);

    // 1단위 외화가 몇 원인지 계산해서 HTML로 전달합니다.
    const exchangeData = {
      usd: krwRate,
      gbp: krwRate / rates.GBP,
      eur: krwRate / rates.EUR,
      jpy: krwRate / rates.JPY,
      cny: krwRate / rates.CNY,
      updateTime: updateTime,
      nextUpdateTime: nextUpdateTime
    };

    return exchangeData;

  } catch (error) {
    // 오류가 발생했을 때 기본 안내 데이터 반환
    return {
      error: true,
      message: '실시간 환율 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      detail: error.message
    };
  }
}

// 환율과 관련된 경제 뉴스 3건을 가져오는 함수
function getExchangeNews() {
  try {
    // 2026년 6월 1일 이후 기사만 보여주기 위한 기준일입니다.
    const minimumNewsDate = new Date('2026-06-01T00:00:00+09:00');

    // Google 뉴스 RSS에서 환율 관련 최신 뉴스를 검색합니다.
    // 검색어에도 after 조건을 넣고, 아래에서 pubDate를 한 번 더 검사합니다.
    const searchKeyword = '환율 원달러 엔화 위안화 경제 after:2026-06-01';
    const newsUrl = 'https://news.google.com/rss/search?q=' + encodeURIComponent(searchKeyword) + '&hl=ko&gl=KR&ceid=KR:ko';

    // RSS 데이터 가져오기
    const response = UrlFetchApp.fetch(newsUrl, {
      muteHttpExceptions: true
    });

    // 응답 코드 확인
    if (response.getResponseCode() !== 200) {
      throw new Error('뉴스 RSS 응답 오류: ' + response.getResponseCode());
    }

    // XML 문자열을 문서 객체로 변환
    const xml = XmlService.parse(response.getContentText());
    const channel = xml.getRootElement().getChild('channel');
    const items = channel.getChildren('item');

    // 2026년 6월 이후 기사만 필터링한 뒤 3건만 화면에 전달합니다.
    const newsList = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const title = item.getChildText('title') || '제목 없음';
      const link = item.getChildText('link') || '#';
      const pubDate = item.getChildText('pubDate') || '';
      const newsDate = new Date(pubDate);

      if (isNaN(newsDate.getTime()) || newsDate < minimumNewsDate) {
        continue;
      }

      newsList.push({
        title: cleanNewsTitle(title),
        link: link,
        pubDate: formatNewsTime(pubDate)
      });

      if (newsList.length >= 3) {
        break;
      }
    }

    return {
      news: newsList,
      updateTime: Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy.MM.dd HH:mm')
    };

  } catch (error) {
    // 뉴스 호출 실패 시 안내 메시지를 반환합니다.
    return {
      error: true,
      message: '경제 뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      detail: error.message
    };
  }
}

// Unix 시간을 한국 시간 형식으로 변환하는 함수
function formatKoreaTime(unixTime) {
  // 시간이 없으면 안내 문구 반환
  if (!unixTime) {
    return '시간 정보 없음';
  }

  // Unix 초 단위를 밀리초 단위로 변환
  const date = new Date(unixTime * 1000);

  // 한국 시간 기준으로 날짜와 시간을 보기 좋게 표시
  return Utilities.formatDate(date, 'Asia/Seoul', 'yyyy.MM.dd HH:mm');
}

// 뉴스 날짜를 한국 시간 형식으로 변환하는 함수
function formatNewsTime(pubDate) {
  // 날짜 정보가 없으면 빈 문자 반환
  if (!pubDate) {
    return '';
  }

  // RSS 날짜 문자열을 Date 객체로 변환
  const date = new Date(pubDate);

  // 날짜가 올바르지 않으면 빈 문자 반환
  if (isNaN(date.getTime())) {
    return '';
  }

  // 한국 시간 기준으로 날짜와 시간을 표시
  return Utilities.formatDate(date, 'Asia/Seoul', 'yyyy.MM.dd HH:mm');
}

// 뉴스 제목에서 언론사명이 너무 길게 보이지 않도록 정리하는 함수
function cleanNewsTitle(title) {
  // Google 뉴스 RSS 제목은 보통 '제목 - 언론사' 형식입니다.
  return title.replace(/\s-\s[^-]+$/, '').trim();
}
