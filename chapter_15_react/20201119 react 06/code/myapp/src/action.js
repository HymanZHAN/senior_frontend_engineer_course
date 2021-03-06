import { useDispatch } from "react-redux";

function useInfoData() {
  const dispatch = useDispatch();
  return ()=>{
    dispatch({
      type: "INFO_LOADING"
    })
    fetch("https://api.apiopen.top/getTangPoetry?page=1&count=20")
      .then(res=>{
        return res.json();
      })
      .then(res=>{
        dispatch({
          type: "INFO_LOAD",
          info: res.result
        })
      })
  }
}

export {useInfoData};