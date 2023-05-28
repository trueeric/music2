export default{
  beforeMount(el, binding){
    // binding.value='headphones-alt'
    let iconClass=`fa fa-${binding.value.icon}  text-green-400  text-2xl`

    if(binding.value.right){
      iconClass+=' float-right'
    }

    // console.log("KKK");
    // console.log(iconClass);


    el.innerHTML +=`<i class="${iconClass}"></i>`;

  }
}