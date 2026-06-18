 /* =========================================================
   스시 도감 - 상세 모달 (데이터 기반)
   - 모든 .sushi-item 클릭 시, 이미지 파일명으로 데이터를 찾아
     하나의 모달을 그 내용으로 채워 띄운다.
   - 별점: sweet / aroma / umami 는 0~5 (채운 별 ★ / 빈 별 ☆)
   - texture: 식감 (한 줄 문자열)
   - feats: 시각적 특징. 항목 수에 따라 2칸 또는 4칸으로 자동 표시
   - 상세 이미지: images/<파일명>_crop.png  (없으면 img 로 직접 지정)
   - level: 1=초, 2=중, 3=상
   ========================================================= */
(function () {
    'use strict';

    const SUSHI = {

        /* ===== 붉은살 ===== */
        tyuutoro: {
            read: 'ちゅうとろ', kanji: '中とろ', kr: '츄토로', krRead: '츄토로', romaji: 'Chutoro', level: 1,
            desc: '참치 뱃살 중 살코기와 지방이 균형을 이루는 부위. <b>적당히 오른 지방</b>이 혀에서 부드럽게 녹으면서도 참치 특유의 <b>진한 감칠맛</b>이 또렷하게 남아, 오토로보다 담백하고 아카미보다 농후하다.',
            sweet: 3, aroma: 2, umami: 5, texture: '부드럽고 차짐',
            feats: ['선홍빛 살에 흰 지방이 그물처럼 퍼짐', '오토로와 아카미 사이의 중간 부위', '지방과 살코기의 비율이 균형적', '온도가 오르면 지방이 녹아 윤기가 돎']
        },
        ootoro: {
            read: 'おおとろ', kanji: '大とろ', kr: '오토로', krRead: '오토로', romaji: 'Otoro', level: 1,
            desc: '참치 뱃살 중 가장 기름진 최상위 부위. 입안에서 사르르 녹는 지방과 <b>진한 고소함</b>이 핵심으로, 씹기도 전에 풀어질 만큼 <b>부드러운 식감</b>을 자랑한다. 살짝 온도가 오르면 풍미가 한층 살아난다.',
            sweet: 4, aroma: 2, umami: 5, texture: '입에서 녹음',
            feats: ['옅은 분홍빛 살에 흰 지방층이 촘촘', '복부 앞쪽에서 나오는 최고급 부위', '지방 함량이 높아 광택이 강함', '근막(스지)이 비치는 부위도 많음']
        },
        akami: {
            read: 'あかみ', kanji: '赤身', kr: '아카미', krRead: '아카미', romaji: 'Akami', level: 1,
            desc: '참치 등쪽의 붉은 살코기로, 지방이 적어 <b>담백하고 깔끔한 맛</b>이 특징이다. 참치 본연의 철분 같은 <b>감칠맛과 산미</b>가 또렷하며, 간장에 절인 즈케로도 즐긴다.',
            sweet: 2, aroma: 2, umami: 4, texture: '탄탄하고 쫀득',
            feats: ['선명한 진홍색 살\n지방이 거의 없어 단면이 매끈', '등쪽 중심부에서 나옴\n직선 방향의 근육 결이 곱고 탄력이 있음']
        },
        mebati: {
            read: 'メバチマグロ', kanji: '', kr: '눈다랑어', krRead: '메바치마구로', romaji: 'Mebachi', level: 1,
            desc: '유통량이 많아 가장 대중적인 참치. 붉은 살이 <b>부드럽고 산뜻한 감칠맛</b>을 내며, 지방이 오른 개체는 도로로도 쓰인다. 무난하고 친숙한 맛으로 사랑받는다.',
            sweet: 2, aroma: 2, umami: 4, texture: '부드러움',
            feats: ['눈이 크고 둥근 데서 이름이 유래\n살색은 선명한 붉은색', '참다랑어보다 결이 부드러움']
        },
        kihadamaguro: {
            read: 'キハダマグロ', kanji: '', kr: '황다랑어', krRead: '키하다마구로', romaji: 'Kihada', level: 1,
            desc: '살색이 옅고 지방이 적어 <b>가볍고 깔끔한 맛</b>을 내는 참치. 산뜻하면서 <b>은은한 단맛</b>이 있어 무겁지 않게 즐기기 좋고, 따뜻한 바다에서 많이 잡힌다.',
            sweet: 2, aroma: 1, umami: 3, texture: '산뜻하고 연함',
            feats: ['지느러미가 노란빛을 띠어 황다랑어\n비교적 날렵한 체형', '살색이 분홍빛으로 옅은 편\n다른 참치보다 지방이 적음']
        },
        katuo: {
            read: 'かつお', kanji: '鰹', kr: '가다랑어(카츠오)', krRead: '카츠오', romaji: 'Katsuo', level: 2,
            desc: '강한 붉은 살의 풍미와 특유의 <b>산미·향</b>이 도드라지는 생선. 표면을 불에 그슬린 타다키로 즐기는 경우가 많고, 생강·파 등 약미와 잘 어울린다. 봄·가을 두 번 제철이 있다.',
            sweet: 1, aroma: 4, umami: 4, texture: '쫀득하고 결이 굵음',
            feats: ['등은 청록·배는 은백색 줄무늬\n살색이 짙은 붉은색', '결이 굵고 단단함\n겉만 살짝 구운 타다키로 많이 냄']
        },
        makajiki: {
            read: 'マカジキ', kanji: '', kr: '청새치', krRead: '마카지키', romaji: 'Makajiki', level: 2,
            desc: '새치류 중 살이 <b>희고 담백하며 부드러운</b> 고급 어종. 기름기가 적당히 올라 은은한 단맛이 돌고, 참치보다 가볍고 깔끔한 맛으로 사랑받는다.',
            sweet: 3, aroma: 1, umami: 3, texture: '부드럽고 매끈',
            feats: ['길고 뾰족한 윗턱(부리)이 특징\n대형 어종이라 살이 많이 나옴', '살색은 옅은 분홍~연한 붉은색\n참치보다 살결이 곱고 연함']
        },
        mekajiki: {
            read: 'メカジキ', kanji: '', kr: '황새치', krRead: '메카지키', romaji: 'Mekajiki', level: 2,
            desc: '새치류 중 살이 <b>가장 부드럽고 기름진</b> 편으로, 분홍빛 살이 입에서 매끄럽게 풀린다. <b>은은한 단맛</b>과 깔끔한 감칠맛이 좋아 구이로도 즐겨 쓰인다.',
            sweet: 3, aroma: 1, umami: 3, texture: '기름지고 부드러움',
            feats: ['눈이 크고 윗턱이 평평한 칼 모양\n결이 부드러워 잘 부서짐', '살색은 분홍빛이 도는 흰살\n지방이 올라 윤기가 있음']
        },
        saamon: {
            read: 'サーモン', kanji: '', kr: '연어', krRead: '사몬', romaji: 'Salmon', level: 1,
            desc: '선명한 주황빛 살에 <b>기름진 고소함과 부드러운 식감</b>이 어우러진 대중적인 네타. <b>풍부한 지방</b>에서 오는 단맛이 강해 누구나 즐기기 쉽고, 양파·소스와도 잘 어울린다.',
            sweet: 4, aroma: 2, umami: 3, texture: '기름지고 부드러움',
            feats: ['선명한 주황색 살에 흰 지방 줄무늬\n결을 따라 흰 띠가 규칙적', '지방이 많아 광택이 강함\n초밥용은 주로 양식·냉동 처리']
        },

        /* ===== 흰살 ===== */
        hirame: {
            read: 'ひらめ', kanji: '平目', kr: '광어(넙치)', krRead: '히라메', romaji: 'Hirame', level: 1,
            desc: '대표적인 흰살생선으로, <b>담백하면서도 은은한 감칠맛</b>이 특징이다. 살이 탄탄해 <b>쫄깃한 식감</b>이 살아 있고, 지느러미살(엔가와)은 쫀득하고 고소해 별미로 친다. 겨울이 제철이다.',
            sweet: 2, aroma: 1, umami: 3, texture: '탄탄하고 쫄깃',
            feats: ['몸이 납작하고 두 눈이 한쪽에 몰림', '살은 반투명한 흰색', '결이 곱고 단단함', '지느러미 가장자리살(엔가와)이 별미']
        },
        hosigarei: {
            read: 'ホシガレイ', kanji: '', kr: '범가자미', krRead: '호시가레이', romaji: 'Hoshigarei', level: 2,
            desc: '가자미류 중에서도 귀하게 치는 고급 흰살. <b>기품 있는 단맛</b>과 깊은 감칠맛, 적당한 지방이 어우러져 광어보다 진한 풍미를 낸다.',
            sweet: 3, aroma: 1, umami: 4, texture: '탄탄하고 차짐',
            feats: ['등면에 별처럼 흩어진 반점\n가자미 중 대형에 속함', '살은 맑은 흰색\n엔가와에 지방이 많음']
        },
        matukawakarei: {
            read: 'マツカワガレイ', kanji: '', kr: '노랑가자미(돌가자미)', krRead: '마츠카와가레이', romaji: 'Matsukawa', level: 2,
            desc: '단단한 껍질을 가진 고급 가자미로, <b>탄탄한 식감</b>과 진한 감칠맛이 일품이다. 살에 적당히 기름이 올라 <b>은은한 단맛</b>이 돌며 겨울에 특히 맛이 오른다.',
            sweet: 3, aroma: 1, umami: 4, texture: '매우 탄탄',
            feats: ['껍질이 솔방울처럼 거칠어 마츠카와\n결이 치밀하고 단단함', '살은 투명감 있는 흰색\n껍질을 살린 손질로도 냄']
        },
        samegarei: {
            read: 'サメガレイ', kanji: '', kr: '줄가자미', krRead: '사메가레이', romaji: 'Samegarei', level: 3,
            desc: '껍질이 상어 가죽처럼 까끌한 데서 이름이 붙은 가자미. 살에 <b>젤라틴질의 지방</b>이 풍부해 농후하고 <b>차진 식감</b>을 내며, 숙성하면 감칠맛이 한층 깊어진다.',
            sweet: 3, aroma: 1, umami: 5, texture: '쫀득하고 농후',
            feats: ['껍질이 상어 피부처럼 거칠고 단단\n살에 젤라틴질이 많아 끈적임', '가자미 중 희소한 고급종\n숙성용으로 선호됨']
        },
        madai: {
            read: 'まだい', kanji: '真鯛', kr: '참돔', krRead: '마다이', romaji: 'Madai', level: 1,
            desc: "'생선의 왕'으로 불리는 대표 흰살로, <b>맑고 깔끔한 감칠맛</b>과 은은한 단맛이 균형을 이룬다. 탄력 있는 살에서 오는 <b>경쾌한 식감</b>이 좋고, 살짝 숙성하면 풍미가 더 진해진다.",
            sweet: 2, aroma: 1, umami: 4, texture: '탄력 있고 쫄깃',
            feats: ['붉은 분홍빛 껍질에 푸른 반점', '살은 투명한 흰색', '결이 곱고 탄력이 강함', '껍질을 데친 마츠카와즈쿠리로도 냄']
        },
        isidai: {
            read: 'いしだい', kanji: '石鯛', kr: '돌돔', krRead: '이시다이', romaji: 'Ishidai', level: 2,
            desc: '단단한 살과 깊은 풍미를 가진 고급 흰살. <b>탄탄한 식감</b>과 함께 <b>진한 감칠맛</b>이 오래 남고, 여름이 제철로 흰살 중에서도 맛이 강한 편이다.',
            sweet: 2, aroma: 1, umami: 4, texture: '매우 탄탄',
            feats: ['몸에 검은 가로 줄무늬\n이빨이 단단해 조개도 부숨', '살은 윤기 있는 흰색\n결이 굵고 씹는 맛이 강함']
        },
        kinmedai: {
            read: 'きんめだい', kanji: '金目鯛', kr: '금눈돔', krRead: '킨메다이', romaji: 'Kinmedai', level: 1,
            desc: '선명한 붉은 껍질과 큰 금빛 눈이 특징인 고급 생선. 흰살이지만 <b>지방이 풍부</b>해 입에서 부드럽게 녹고, <b>은은한 단맛</b>과 깊은 감칠맛이 어우러진다. 껍질을 살짝 구워 내기도 한다.',
            sweet: 3, aroma: 1, umami: 4, texture: '부드럽고 기름짐',
            feats: ['선명한 주홍빛 껍질\n눈이 크고 금색으로 빛남', '살은 옅은 분홍빛 흰살\n껍질 쪽에 지방이 많음']
        },

        /* ===== 등푸른생선 ===== */
        aji: {
            read: 'あじ', kanji: '鯵', kr: '전갱이', krRead: '아지', romaji: 'Aji', level: 2,
            desc: '등푸른생선의 대표 격으로, <b>고소한 지방과 산뜻한 감칠맛</b>이 균형을 이룬다. 비린내가 적고 부드러워 입문에 좋으며, 생강·파·간 마늘 같은 약미를 얹어 낸다.',
            sweet: 2, aroma: 3, umami: 4, texture: '부드럽고 차짐',
            feats: ['옆줄을 따라 단단한 가시 비늘(제이고)', '등은 푸르고 배는 은백색', '살은 옅은 분홍빛', '약미(생강·파)를 얹어 내는 경우가 많음']
        },
        saba: {
            read: 'さば', kanji: '鯖', kr: '고등어', krRead: '사바', romaji: 'Saba', level: 3,
            desc: '진한 지방과 강한 풍미를 지닌 등푸른생선. 선도가 핵심이라 주로 식초에 절인 <b>시메사바</b>로 내며, <b>고소한 기름</b>과 식초의 산미가 어우러져 깊은 맛을 낸다.',
            sweet: 1, aroma: 4, umami: 4, texture: '기름지고 부드러움',
            feats: ['등에 물결치는 청록색 무늬\n배는 은백색', '지방이 많아 살이 기름짐\n식초에 절인 시메사바로 많이 냄']
        },
        sanma: {
            read: 'さんま', kanji: '秋刀魚', kr: '꽁치', krRead: '산마', romaji: 'Sanma', level: 3,
            desc: '가을을 대표하는 등푸른생선으로, 제철엔 <b>지방이 가득 올라</b> 고소함이 폭발한다. 특유의 <b>진한 향과 감칠맛</b>이 강해 호불호가 갈리며, 생강·파와 함께 내면 풍미가 정돈된다.',
            sweet: 2, aroma: 4, umami: 4, texture: '기름지고 부드러움',
            feats: ['가늘고 긴 칼 모양 몸체\n주둥이 끝이 노란빛', '등은 청록·배는 은색\n가을 제철에 지방이 절정']
        },
        kohada: {
            read: 'こはだ', kanji: '小肌', kr: '전어', krRead: '코하다', romaji: 'Kohada', level: 3,
            desc: '에도마에 스시의 상징과도 같은 빛나는 등푸른생선(히카리모노). 식초와 소금으로 <b>섬세하게 절이는 손질</b>이 맛을 좌우하며, 산뜻한 산미와 <b>깊은 감칠맛</b>이 어우러진다. 장인의 솜씨를 가늠하는 네타로 통한다.',
            sweet: 1, aroma: 3, umami: 4, texture: '탄탄하고 쫀득',
            feats: ['은빛 껍질에 검은 점이 흩뿌려짐\n작아서 한 점에 한 마리 또는 반 마리', '칼집을 곱게 넣어 모양을 냄\n식초·소금에 절여 냄']
        },

        /* ===== 새우 ===== */
        botanebi: {
            read: 'ぼたんえび', kanji: '牡丹海老', kr: '보탄새우', krRead: '보탄에비', romaji: 'Botan-ebi', level: 1,
            desc: '큼직한 몸집에 <b>진한 단맛과 끈적한 감칠맛</b>이 일품인 고급 새우. 날로 내면 특유의 <b>쫀득하고 차진 식감</b>이 살아 있다.',
            sweet: 5, aroma: 1, umami: 5, texture: '쫀득하고 차짐',
            feats: ['몸 전체가 반투명한 붉은색\n꼬리 부분의 선명한 적색이 강조됨', '두껍고 넓은 몸체\n살이 두툼하고 탄력적', '관절 마디가 뚜렷하게 드러남', '머리·알도 함께 즐기기도 하며 머리는 구이나 국물로 활용한다.']
        },
        amaebi: {
            read: 'あまえび', kanji: '甘海老', kr: '단새우', krRead: '아마에비', romaji: 'Amaebi', level: 1,
            desc: '혀 위에서 천천히 풀리는 부드러운 식감과 <b>은은한 단맛</b>이 특징이다. 강한 향보다는 <b>맑고 섬세한 감칠맛</b>이 중심이 되며, 차갑게 제공될수록 <b>촉촉한 질감</b>과 달큰한 풍미가 더욱 두드러진다.',
            sweet: 5, aroma: 2, umami: 4, texture: '매우 부드러움',
            feats: ['길고 가느다란 곡선형 몸체', '보통 2마리를 겹쳐 올리는 경우가 많음', '연한 분홍색 ~ 주황빛 붉은색\n몸 중심부는 반투명', '끝부분으로 갈수록 붉은 채도가 진해짐\n꼬리 부분의 붉은색이 포인트']
        },
        kurumaebi: {
            read: 'くるまえび', kanji: '車海老', kr: '보리새우', krRead: '쿠루마에비', romaji: 'Kuruma-ebi', level: 1,
            desc: '에도마에를 대표하는 새우로, 살짝 데쳐 내면 <b>탱탱한 식감</b>과 응축된 단맛이 살아난다. 가열로 끌어올린 <b>진한 감칠맛</b>이 특징이며, 붉고 흰 줄무늬가 화려하다.',
            sweet: 4, aroma: 1, umami: 4, texture: '탱탱하고 탄력적',
            feats: ['붉은색과 흰색의 선명한 가로 줄무늬\n익히면 색이 더 선명해짐', '살이 단단하고 탄력적\n주로 데쳐서 냄']
        },
        budouebi: {
            read: 'ぶどうえび', kanji: '葡萄海老', kr: '포도새우', krRead: '부도에비', romaji: 'Budo-ebi', level: 2,
            desc: '포도빛 도는 껍질에서 이름이 붙은 희소한 고급 새우. 단새우 계열보다 <b>더 진한 단맛과 농후한 감칠맛</b>을 내며, <b>끈적할 만큼 차진 식감</b>이 특징이다.',
            sweet: 5, aroma: 1, umami: 5, texture: '매우 쫀득',
            feats: ['짙은 보라빛이 도는 껍질색이 특징이다', '보탄새우보다 희소한 고급종', '살이 두툼하고 끈적이는 식감', ' 주로 날로 냄']
        },
        morotogeakaebi: {
            read: 'モロトゲアカエビ', kanji: '', kr: '물렁가시붉은새우(꽃새우)', krRead: '모로토게아카에비', romaji: 'Morotoge-ebi', level: 2,
            desc: '가시가 길고 화려한 붉은 무늬를 가진 새우로, <b>진하고 농밀한 단맛</b>이 매력이다. 살이 부드러우면서도 <b>차진 식감</b>을 내며, 단새우보다 깊은 풍미를 자랑한다.',
            sweet: 5, aroma: 1, umami: 4, texture: '부드럽고 쫀득',
            feats: ['몸에 붉은 줄무늬가 선명\n이마 가시(뿔)가 길고 뾰족', '단새우보다 크고 진한 색이 특징이며 주로 날로 냄']
        },
        siroebi: {
            read: 'しらえび', kanji: '白海老', kr: '흰돗대기새우', krRead: '시라에비', romaji: 'Shira-ebi', level: 2,
            desc: "도야마만 등에서 나는 투명하고 작은 '바다의 보석' 새우. 여러 마리를 모아 군함이나 쥠으로 내며, <b>섬세하고 우아한 단맛</b>이 입안에 은은하게 퍼진다.",
            sweet: 4, aroma: 1, umami: 3, texture: '부드럽고 매끈',
            feats: ['반투명한 흰빛의 작은 몸', '도야마만의 명물', '작아서 여러 마리를 모아 냄', '살이 매우 연하고 부드러움']
        },

        /* ===== 조개류 ===== */
        hotate: {
            read: 'ほたて', kanji: '帆立', kr: '가리비', krRead: '호타테', romaji: 'Hotate', level: 1,
            desc: '두툼한 관자에서 오는 <b>풍부한 단맛</b>이 매력인 조개. 날로 내면 부드럽고 차지며, <b>은은한 감칠맛</b>이 깊다. 살짝 구우면 단맛이 한층 응축된다.',
            sweet: 5, aroma: 1, umami: 4, texture: '부드럽고 차짐',
            feats: ['둥글고 두툼한 흰 관자(패주)\n결이 부드럽고 탄력적', '날·구이 모두 즐김\n신선할수록 단맛이 강함']
        },
        akagai: {
            read: 'あかがい', kanji: '赤貝', kr: '피조개', krRead: '아카가이', romaji: 'Akagai', level: 2,
            desc: '선명한 붉은 살과 강한 <b>바다 향</b>이 특징인 조개. <b>오도독한 식감</b>과 또렷한 감칠맛이 살아 있고, 도마에 치면 살이 움찔할 만큼 신선도가 생명이다.',
            sweet: 2, aroma: 4, umami: 4, texture: '오도독하고 쫄깃',
            feats: ['살이 선명한 붉은색\n헤모글로빈을 지녀 붉은빛', '씹으면 오도독한 식감\n신선도가 맛을 좌우']
        },
        tairagai: {
            read: 'たいらがい', kanji: '平貝', kr: '키조개', krRead: '타이라가이', romaji: 'Tairagai', level: 1,
            desc: '큼직한 관자를 내는 조개로, <b>은은한 단맛</b>과 담백한 풍미가 특징이다. 날것은 부드럽고, 살짝 구우면 <b>고소한 향</b>과 단맛이 살아난다.',
            sweet: 3, aroma: 1, umami: 3, texture: '부드럽고 차짐',
            feats: ['삼각형의 큰 껍데기\n관자가 크고 두툼함', '살은 옅은 미색\n구이로도 즐겨 냄']
        },
        torigai: {
            read: 'とりがい', kanji: '鳥貝', kr: '새조개', krRead: '토리가이', romaji: 'Torigai', level: 2,
            desc: '검은빛 도는 살에 <b>은은한 단맛</b>과 독특한 향이 어우러진 조개. 살짝 데쳐 내며, 부드러우면서 <b>탄력 있는 식감</b>과 깔끔한 뒷맛이 일품이다.',
            sweet: 3, aroma: 2, umami: 3, texture: '부드럽고 탱탱',
            feats: ['살 끝이 검고 윤기가 남\n새 부리를 닮은 모양', '주로 살짝 데쳐서 냄\n윤기가 신선도의 척도']
        },
        awabi: {
            read: 'あわび', kanji: '鮑', kr: '전복', krRead: '아와비', romaji: 'Awabi', level: 2,
            desc: '쫄깃하고 단단한 <b>식감</b>이 매력인 고급 조개. 날것은 오도독하고, 찌면 부드러워지며 <b>진한 감칠맛</b>과 바다 향이 깊어진다. 간(肝)도 별미로 친다.',
            sweet: 2, aroma: 3, umami: 4, texture: '단단하고 쫄깃',
            feats: ['타원형의 단단한 한쪽 껍데기\n껍데기 안쪽은 진주빛', '살이 매우 단단함\n날·찜에 따라 식감이 다름']
        },

        /* ===== 연체동물 ===== */
        aoriika: {
            read: 'アオリイカ', kanji: '', kr: '무늬오징어', krRead: '아오리이카', romaji: 'Aori-ika', level: 1,
            desc: '오징어 중 최고급으로 치는 종으로, <b>진한 단맛</b>과 차진 식감이 일품이다. 살이 두툼하면서도 부드럽게 끊기고, 칼집을 넣으면 <b>매끄러운 식감</b>이 한층 살아난다.',
            sweet: 4, aroma: 1, umami: 4, texture: '쫀득하고 매끄러움',
            feats: ['몸이 넓고 둥근 지느러미\n살이 두껍고 투명한 흰색', '표면에 칼집을 넣어 냄\n오징어 중 단맛이 가장 강한 편']
        },
        tako: {
            read: 'たこ', kanji: '蛸', kr: '문어', krRead: '타코', romaji: 'Tako', level: 1,
            desc: '데쳐서 내는 대표적인 네타로, <b>쫄깃한 식감</b>과 은은한 단맛이 특징이다. 잘 손질해 삶으면 부드러우면서도 탄력 있고, <b>깔끔한 감칠맛</b>이 뒤따른다.',
            sweet: 2, aroma: 1, umami: 3, texture: '쫄깃하고 탄력적',
            feats: ['삶으면 표면이 붉은 자주색\n빨판이 늘어선 다리를 썰어 냄', '살이 단단하고 탄력적\n오래 주물러 부드럽게 손질']
        },
        geso: {
            read: 'ゲソ', kanji: '', kr: '오징어다리', krRead: '게소', romaji: 'Geso', level: 2,
            desc: '오징어 다리 부위로, 몸통보다 <b>쫄깃하고 씹는 맛</b>이 강하다. 살짝 데치거나 구워 <b>고소한 감칠맛</b>을 끌어올리며, 식감을 즐기는 네타다.',
            sweet: 2, aroma: 1, umami: 3, texture: '쫄깃하고 질김',
            feats: ['빨판이 달린 다리 부위\n몸통보다 단단하고 쫄깃', '데치거나 구워서 냄\n고소한 풍미가 강함']
        },

        /* ===== 알 · 이리 ===== */
        uni: {
            read: 'うに', kanji: '雲丹', kr: '성게알', krRead: '우니', romaji: 'Uni', level: 2,
            desc: '짙은 <b>바다 향과 농후한 감칠맛</b>이 응축된 진미. 입에서 사르르 녹으며 <b>크리미한 단맛</b>이 퍼지고, 신선도에 따라 맛 차이가 크다. 주로 군함말이로 낸다.',
            sweet: 3, aroma: 4, umami: 5, texture: '크리미하고 부드러움',
            feats: ['주황~노란빛의 생식소\n혀에 닿으면 부드럽게 풀림', '김을 두른 군함말이로 냄\n신선할수록 형태가 또렷']
        },
        ikura: {
            read: 'いくら', kanji: '', kr: '연어알', krRead: '이쿠라', romaji: 'Ikura', level: 1,
            desc: '톡 터지는 <b>알의 식감</b>과 짭짤하고 진한 감칠맛이 매력. 입안에서 <b>주르륵 터지는 즙</b>과 함께 고소한 풍미가 퍼지며, 간장에 절여 군함말이로 낸다.',
            sweet: 1, aroma: 2, umami: 4, texture: '톡 터짐',
            feats: ['붉은 주황빛의 굵은 알\n투명하게 빛나는 구슬 모양', '간장 등에 절여 냄\n군함말이로 담아 냄']
        },
        sirako: {
            read: 'しらこ', kanji: '白子', kr: '이리(어백)', krRead: '시라코', romaji: 'Shirako', level: 3,
            desc: '대구·복어 등 수컷의 정소로, <b>크리미하고 농후한</b> 질감이 핵심이다. 입에서 부드럽게 녹으며 <b>진한 감칠맛</b>을 내지만, 독특한 풍미로 호불호가 갈리는 겨울 진미다.',
            sweet: 1, aroma: 3, umami: 4, texture: '크리미하고 녹음',
            feats: ['뇌 모양으로 주름진 흰 덩어리\n매우 부드럽고 무름', '날·데침·구이로 냄\n겨울 한정의 진미']
        },
        kazunoko: {
            read: 'かずのこ', kanji: '数の子', kr: '청어알', krRead: '카즈노코', romaji: 'Kazunoko', level: 2,
            desc: '청어의 알집으로, <b>오도독 톡톡 끊기는 독특한 식감</b>이 가장 큰 매력이다. 맛 자체는 담백하며 염장·간장 절임으로 간을 해 <b>은은한 감칠맛</b>을 더한다. 명절 음식으로도 쓰인다.',
            sweet: 1, aroma: 1, umami: 2, texture: '오도독 톡톡',
            feats: ['노란빛의 단단한 알 덩어리\n수많은 알이 촘촘히 뭉침', '씹으면 톡톡 끊기는 식감\n염장·절임으로 간을 함']
        },
        karasumi: {
            read: 'カラスミ', kanji: '', kr: '숭어 어란', krRead: '카라스미', romaji: 'Karasumi', level: 3,
            desc: '숭어 알을 소금에 절여 말린 진미로, <b>응축된 감칠맛과 짭짤한 풍미</b>가 강렬하다. 치즈처럼 <b>꾸덕하고 농후한 식감</b>에 깊은 뒷맛이 오래 남아 술안주로도 일품이다.',
            sweet: 1, aroma: 3, umami: 5, texture: '꾸덕하고 농후',
            feats: ['호박빛~주황색의 납작한 덩어리\n소금에 절여 건조한 가공품', '치즈 같은 꾸덕한 질감\n얇게 저며 조금씩 냄']
        },

        /* ===== 기타 ===== */
        anago: {
            read: 'あなご', kanji: '穴子', kr: '붕장어', krRead: '아나고', romaji: 'Anago', level: 1,
            desc: '부드럽게 쪄낸 바닷장어로, <b>입에서 사르르 풀리는 식감</b>이 일품이다. 달짝지근한 <b>츠메(조림 소스)</b>를 발라 내며, 담백하면서 은은한 단맛이 돈다. 민물장어보다 가볍고 섬세하다.',
            sweet: 3, aroma: 1, umami: 3, texture: '매우 부드러움',
            feats: ['가늘고 긴 흰살의 바닷장어\n쪄서 부드럽게 익힘', '달콤한 츠메 소스를 발라 냄\n민물장어보다 담백']
        },
        unagi: {
            read: 'うなぎ', kanji: '鰻', kr: '장어(민물)', krRead: '우나기', romaji: 'Unagi', level: 1,
            desc: '양념을 발라 구운 민물장어로, <b>기름진 고소함과 부드러운 살</b>이 매력이다. 달콤짭짤한 <b>타레(양념)</b>와 숯불 향이 어우러져 풍미가 진하며, 따뜻하게 낼 때 가장 맛있다.',
            sweet: 3, aroma: 2, umami: 4, texture: '기름지고 부드러움',
            feats: ['껍질을 구워 윤기가 도는 갈색\n살이 두툼하고 기름짐', '달콤한 타레를 발라 구움\n따뜻하게 내는 경우가 많음']
        }
    };

    /* ---------- DOM 참조 ---------- */
    const modal = document.getElementById('detailModal');
    if (!modal) return;
    const box = modal.querySelector('.modal-box');
    const closeBtn = modal.querySelector('.modal-close');
    const elLevel = modal.querySelectorAll('.detail-level span');
    const elTitle = modal.querySelector('.detail-title');
    const elImg = modal.querySelector('.detail-img img');
    const elKr = modal.querySelector('.detail-kr');
    const elReading = modal.querySelector('.detail-reading');
    const elDesc = modal.querySelector('.detail-desc');
    const elStars = modal.querySelectorAll('.r-stars[data-k]');
    const elTexture = modal.querySelector('.r-text[data-k="texture"]');
    const elFeatGrid = modal.querySelector('.feature-grid');

    let lastTrigger = null;

    /* ---------- 유틸 ---------- */
    function stars(n) {
        n = Math.max(0, Math.min(5, n | 0));
        return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
    }
    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function keyFromItem(item) {
        const img = item.querySelector('img');
        if (!img) return null;
        const m = img.getAttribute('src').match(/([^/\\]+)\.[a-zA-Z0-9]+$/);
        return m ? m[1] : null;
    }

    /* ---------- 모달 채우기 ---------- */
    function fill(key) {
        const d = SUSHI[key];
        if (!d) return false;

        // 난이도 (초/중/상)
        elLevel.forEach(function (span, i) {
            span.classList.toggle('active', (i + 1) === d.level);
        });

        // 제목 (가나 + 한자 박스 / 한자 없으면 이름만)
        const reading = d.read || '';
        if (d.kanji) {
            elTitle.innerHTML = '<span class="kana">' + reading + '</span>'
                + '<span class="bracket">[</span>'
                + d.kanji.split('').map(function (c) { return '<span class="kanji">' + c + '</span>'; }).join('')
                + '<span class="bracket">]</span>';
        } else {
            elTitle.innerHTML = '<span class="kana">' + reading + '</span>';
        }

        // 이미지 (상세는 항상 _crop 버전 사용)
        elImg.src = d.img || ('images/' + key + '_crop.png');
        elImg.alt = d.kr || '';

        // 이름 / 읽는법
        elKr.textContent = d.kr || '';
        elReading.innerHTML = '<span>[' + (d.krRead || '') + ']</span><span>[' + (d.romaji || '') + ']</span>';

        // 설명
        elDesc.innerHTML = d.desc || '';

        // 별점 + 식감
        elStars.forEach(function (el) {
            el.textContent = stars(d[el.getAttribute('data-k')]);
        });
        if (elTexture) elTexture.textContent = d.texture || '';

        // 시각적 특징 (2칸 또는 4칸 자동)
        const feats = d.feats || [];
        elFeatGrid.className = 'feature-grid feat-' + feats.length;
        elFeatGrid.innerHTML = feats.map(function (t, i) {
            const num = ('0' + (i + 1)).slice(-2);
            return '<div class="feature-cell"><span class="f-num">' + num + '.</span><p>'
                + esc(t).replace(/\n/g, '<br>') + '</p></div>';
        }).join('');

        return true;
    }

    /* ---------- 열기 / 닫기 ---------- */
    function open(key, trigger) {
        if (!fill(key)) return;
        lastTrigger = trigger || null;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (box) box.scrollTop = 0;
        if (closeBtn) closeBtn.focus();
    }
    function close() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastTrigger) lastTrigger.focus();
    }

    /* ---------- 검색용 정규화 ---------- */
    // 띄어쓰기·하이픈·언더바·괄호·가운뎃점·슬래시 무시 + 소문자화
    function norm(s) {
        return String(s || '').replace(/[\s\-_()/·~]/g, '').toLowerCase();
    }

    const grid = document.querySelector('.sushi-grid');
    const searchText = {};   // key -> 검색용 정규화 문자열

    function makeClickable(item) {
        item.classList.add('is-clickable');
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-haspopup', 'dialog');
    }

    /* ---------- 원본 아이템: 클릭 가능 처리 + 검색 색인 구축 ---------- */
    document.querySelectorAll('.sushi-item').forEach(function (item) {
        const key = keyFromItem(item);
        if (!key || !SUSHI[key]) return;
        makeClickable(item);

        const d = SUSHI[key];
        const sub = item.querySelector('.sub-name');
        const jp = item.querySelector('.jp-name');
        // 그리드의 보조 설명("…(참치 뱃살)")·일본어 이름 + 데이터 필드를 모두 색인
        searchText[key] = [
            sub ? sub.textContent : '', jp ? jp.textContent : '',
            d.kr, d.krRead, d.romaji, d.read, d.kanji
        ].map(norm).filter(Boolean).join('|');
    });

    /* ---------- 아이템 클릭/키보드 (이벤트 위임 → 복제 카드도 동작) ---------- */
    document.addEventListener('click', function (e) {
        const item = e.target.closest ? e.target.closest('.sushi-item.is-clickable') : null;
        if (!item) return;
        const key = keyFromItem(item);
        if (key && SUSHI[key]) open(key, item);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const active = document.activeElement;
        const item = active && active.closest ? active.closest('.sushi-item.is-clickable') : null;
        if (!item) return;
        e.preventDefault();
        const key = keyFromItem(item);
        if (key && SUSHI[key]) open(key, item);
    });

    /* ---------- 닫기 이벤트 ---------- */
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) close();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    /* ---------- 검색 (그리드 맨 위에 결과 모으기) ---------- */
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    const notice = document.getElementById('searchNotice');
    const noticeOk = notice ? notice.querySelector('.notice-ok') : null;

    function showNotice() {
        if (!notice) return;
        notice.classList.add('is-open');
        notice.setAttribute('aria-hidden', 'false');
        if (noticeOk) noticeOk.focus();
    }
    function closeNotice() {
        if (!notice) return;
        notice.classList.remove('is-open');
        notice.setAttribute('aria-hidden', 'true');
        if (searchInput) searchInput.focus();
    }

    // 이전 검색 결과 블록 제거
    function clearResults() {
        if (!grid) return;
        grid.querySelectorAll('.is-search-result').forEach(function (n) { n.remove(); });
    }

    // 검색 결과 블록을 그리드 맨 앞에 삽입
    function buildResults(query, items) {
        const frag = document.createDocumentFragment();

        const header = document.createElement('div');
        header.className = 'grid-category is-search-result search-result-cat';
        header.innerHTML = '<h2>‘' + esc(query.trim()) + '’ 검색 결과 · ' + items.length + '건</h2>';
        frag.appendChild(header);

        items.forEach(function (item) {
            const clone = item.cloneNode(true);
            clone.classList.add('is-search-result');
            clone.removeAttribute('id');      // 원본 id 중복 방지
            frag.appendChild(clone);
        });

        grid.insertBefore(frag, grid.firstChild);
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function doSearch() {
        if (!searchInput || !grid) return;
        const nq = norm(searchInput.value);
        clearResults();
        if (!nq) return;                  // 빈 검색 → 결과 초기화만

        // 그리드 순서대로, 글자가 포함된 모든 원본 아이템 수집
        const matches = [];
        grid.querySelectorAll(':scope > .sushi-item').forEach(function (item) {
            const key = keyFromItem(item);
            if (key && searchText[key] && searchText[key].indexOf(nq) !== -1) {
                matches.push(item);
            }
        });

        if (matches.length === 0) { showNotice(); return; }
        buildResults(searchInput.value, matches);
    }

    if (searchBtn) searchBtn.addEventListener('click', doSearch);
    if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); doSearch(); }
        });
        // 입력을 모두 지우면 결과 블록도 자동 제거
        searchInput.addEventListener('input', function () {
            if (!norm(searchInput.value)) clearResults();
        });
    }
    if (noticeOk) noticeOk.addEventListener('click', closeNotice);
    if (notice) notice.addEventListener('click', function (e) {
        if (e.target === notice) closeNotice();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && notice && notice.classList.contains('is-open')) closeNotice();
    });
})();