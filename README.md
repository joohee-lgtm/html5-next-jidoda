# NEXT JIDODA

2014-02-HTML5 project

- Mobile Client ('/')
  - 모바일 클라이언트는 서버와 통신함
  - 서버로 자신의 상태 정보를 보내줌 (to server)
    - 보내는 요청 : update user, remove user (from server)
- Map Client ('/map')
  - 맵 클라이언트는 서버와 통신함(to server)
  - 서버로부터 각 클라이언트들의 상태 정보를 받음
    - 보내는 요청 : map opened
    - 받는 요청 : initial data, sync data, remove data (from server)
- Server
  - 역할 1. 모바일 클라이언트로 부터 받은 정보를 맵 클라이언트로 전달해주는 역할
    - 보내는 요청 : initial data, sync data, remove data (to map client)
    - 받는 요청 : update user, remove user (from mobile client), map opened (from map client)

  - 역할2. 모바일 클라이언트들의 정보를 받아서 저장함
    - 저장하는 곳 : totalData
    - 사용하는 함수 : updateData, removeData, allData(전체 데이터를 리스트 형태로 반환함)
    
