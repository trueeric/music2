import _ from "lodash"

export default{
  install(app){
    const baseComponents=import.meta.glob("../components/*.vue",{
      eager:true,
    })

    Object.entries(baseComponents).forEach(([path, module])=>{
      // const componentName= _.upperFirst(
      //   _.camelCase(path.split("/")
      //   .pop()
      //   .replace(/\.\w+$/,"")
      //   )
      // )
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, ''))
        .replace(/\.\w+$/, '').replace('Vue', ''),
      );
      console.log(path.componentName);
    })
  }
}