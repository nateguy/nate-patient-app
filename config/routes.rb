Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "patients#index"

  resources :patients do
    collection { post :import }
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :patients, only: [:index]
    end
  end
end
