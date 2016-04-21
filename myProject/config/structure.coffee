# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  # tabs: [
    # {
      # title: "Index"
      # id: "index"
      # location: "example#getting-started" # Supersonic module#view type navigation
    # }
    # {
      # title: "Ideas"
      # id: "ideas"
      # location: "idea#index" # Supersonic module#view type navigation
    # }
    # {
      # title: "Settings"
      # id: "settings"
      # location: "example#settings"
    # }
    # {
      # title: "Internet"
      # id: "internet"
      # location: "http://google.com" # URLs are supported!
    # }
  # ]

  rootView:
    location: "idea#index"

  preloads: [
    {
      id: "learn-more"
      location: "example#learn-more"
    }
    {
      id: "using-the-scanner"
      location: "example#using-the-scanner"
    }
  ]

  drawers:
    left:
      id: "leftDrawer"
      location: "common#leftDrawer"
      showOnAppLoad: false
    options:
      animation: "swingingDoor"

  # initialView:
    # id: "initialView"
    # location: "example#getting-started"
