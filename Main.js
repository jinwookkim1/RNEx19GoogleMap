import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';

// plugin 추가 ####################################################################
//   $ npm install --save react-native-maps

// 위 추가후에 run했을 때 에러가 나면 직접 저 라이브러리의 git저장소를 가져와서 install
//   $ npm install --save git+https://git@github.com/react-native-community/react-native-maps.git
// #####################################################################################

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

// 구글 지도를 사용하려면 android/app/src/main/AndroidManfest.xml문서의 <application></application>안에
// 구글지도 사용을 위한 meta-data 적용 해야함
// <meta-data android:name="com.google.android.geo.API_KEY" android:value="AIzaSyAVlbIVIQsEzAouGmIOgx6Ecun-Ev8b4qA"/>



export default class Main extends Component{

    // 3번실습에서 사용할 region state변수
    constructor(){
        super();

        this.state={
            region : {
                latitude: 37.562087,
                longitude: 127.035192,
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
            },

            //3.3실습에서 사용할 마커정보들 배열
            markers : [
                { 
                    latlng : {latitude:37.562516, longitude:127.035679},
                    title : "희망약국",
                    description : "왕십리에 있는 약국"
                },
                { 
                    latlng : {latitude:37.561155, longitude:127.034560},
                    title : "이수프라자약국",
                    description : "왕십리에 있는 약국"
                },
                { 
                    latlng : {latitude:37.560710, longitude:127.035978},
                    title : "연세우리약국",
                    description : "왕십리에 있는 약국"
                },
                { 
                    latlng : {latitude:37.562162, longitude:127.032171},
                    title : "왕십리약국",
                    description : "왕십리에 있는 약국"
                }

            ],

        };


    }    



    render(){
        return(
            <View style={ {flex:1, padding:16} }>
                <Text style={ { padding:8, } }>Map TEST</Text>  

                {/* 1. 기본 맵 보여주기 - 별도의 위치지정이 없으면 줌레벨 1의 기본 위치지도 보여짐 */}
                {/* <MapView 
                    style={ {flex:1} }
                    provider={PROVIDER_GOOGLE}>
                </MapView> */}

                {/* 2. 초기 맵의 중심 위치 지정 */}
                {/* <MapView 
                    style={ {flex:1} }
                    provider={PROVIDER_GOOGLE}
                    // 교육원 위치 지정
                    initialRegion={{
                        latitude: 37.562087, 
                        longitude: 127.035192,
                        // 얼마의 위도경도 차이까지 지도에 표시되는가 여부(줌과 연관됨)
                        latitudeDelta: 0.0922, //0.00922로 하면 줌업됨
                        longitudeDelta: 0.0421, //0.00421로 하면 줌업됨
                      }}>
                </MapView> */}

                {/* 3. state를 이용해서 region 설정 */}
                {/* <MapView 
                    style={ {flex:1} }
                    provider={PROVIDER_GOOGLE}
                    region={ this.state.region }
                    // 지도를 드래그 할때마다 좌표의 변화에 반응하는 콜백함수
                    // [드래그 할때마다마다 호출되어 너무 빈번하게 실행되므로 굳이 실습X]
                    // onRegionChange= { this.onRegionChange }
                    >                    
                </MapView> */}
               

                {/* 3. 맵에 마커 지정 */}
                <MapView 
                    style={ {flex:1} }
                    provider={ PROVIDER_GOOGLE }
                    region= { this.state.region} >

                    {/*3.1 마커 만들기 */}
                    <Marker 
                        coordinate={ this.state.region }
                        title="미래능력개발교육원"
                        description="http://www.mrhi.or.kr"></Marker>

                    {/*3.2 마커를 또 추가하고 싶다면 */}
                    <Marker 
                        coordinate={ {latitude:37.561727, longitude:127.036370} }
                        title="성동경찰서"
                        description="https://www.smpa.go.kr/"></Marker>

                    {/*3.3 마커 여러개를 보여주고 싶다면  */}
                    {/* 마커정보들 배열의 map()메소드 사용하여 개수만큼 <Marker> 생성 */}
                    {
                        this.state.markers.map( (marker, index)=> (
                            <Marker 
                                coordinate={ marker.latlng }
                                title={ marker.title }
                                description={ marker.description }
                                //map()의 childComponent는 반드시 key 속성을 가져야 경고가 없음
                                key= {index}
                                //아이콘 이미지설정
                                image={ require('./images/icon.png') }                                
                            ></Marker>
                        ))
                    }

                    {/* 3.4 마커 Collout(툴팁박스) 클릭반응하기 */}
                    <Marker
                        coordinate={ {latitude:37.563341, longitude:127.036909} }
                        title="성동구청"
                        description="http://www.sd.go.kr/"
                        onCalloutPress={ this.clickMakerCallout }>
                    </Marker>
                </MapView>

                

                {/* 더 많은 기능은 https://github.com/react-native-community/react-native-maps 사이트 참고할 것 */}

            </View>
        );

    }


    // 3.4실습에서 사용할 멤버 메소드
    clickMakerCallout(){
        //alert('http://www.sd.go.kr/');

        // 특정 URL의 웹문서를 디바이스의 웹브라우저를 통해 열기
        //Linking클래스 - URL과 연결해 주는 클래스 [ canOpenURL()- 웹브라우저를 열수 있는가? 즉, 웹브라우저 있는가?  URL이 잘못된 것은 상관없음 ]
        Linking.canOpenURL('http://www.sd.go.kr/').then( supprted=>{ //파라미터 supprted : 웹 브라우저의 지원여부

            //Linking.openURL()- 브라우저를 열어주는 메소드
            if(supprted) Linking.openURL('http://www.sd.go.kr/');
            else alert('Do not know how to open URL');

        })
    }

    
}