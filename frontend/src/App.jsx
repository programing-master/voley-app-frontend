import { ActionProvider } from './context/actionContext'
import { AuthProvider } from './context/authContext'
import { CategoryProvider } from './context/categoryContext'
import { CicleProvider } from './context/cicleContext'
import { ModalityProvider } from './context/modalityContext'
import { PlayerProvider } from './context/playerContext'
import { ProvinceProvider } from './context/provinceContext'
import { RollProvider } from './context/rollContext'
import { SectionProvider } from './context/sectionContext'
import { TrainingProvider } from './context/trainingContext'
import { TrainingTypeProvider } from './context/trainingTypeContext'
import Router from './routes/Router'

function App () {
  return (
    <>
      <AuthProvider>
        <ActionProvider>
          <RollProvider>
            <ProvinceProvider>
              <ModalityProvider>
                <CategoryProvider>
                  <PlayerProvider>
                    <CicleProvider>
                      <TrainingTypeProvider>
                        <TrainingProvider>
                          <SectionProvider>
                            <Router />
                          </SectionProvider>
                        </TrainingProvider>
                      </TrainingTypeProvider>
                    </CicleProvider>
                  </PlayerProvider>
                </CategoryProvider>
              </ModalityProvider>
            </ProvinceProvider>
          </RollProvider>
        </ActionProvider>
      </AuthProvider>
    </>
  )
}

export default App
