# image들을 넣는 파일입니다.

## .css파일에서 절대경로는 src폴더를 기준으로 한다.
## .css파일에서 public폴더에 접근할 수 없다.

### 장점 : 파일을 찾지 못하는 경우, 컴파일 단계에서 에러를 잡을 수 있다

#### 사용법 : import bannerImage from '../assets/banner.png'; 로 import한 후, <img src={bannerImage} /> 이렇게 사용한다.
